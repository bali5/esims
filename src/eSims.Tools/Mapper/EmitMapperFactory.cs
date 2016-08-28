using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace eSims.Tools.Mapper
{
  public static class EmitMapperFactory
  {
    private readonly static ILogger mLogger = ApplicationLogging.CreateLogger(typeof(EmitMapperFactory));

    #region Private Fields

    private static Dictionary<Type, Dictionary<Type, EmitMapperBase>> mMappers = new Dictionary<Type, Dictionary<Type, EmitMapperBase>>();
    private static Dictionary<Type, Dictionary<Type, EmitMapperBase>> mCopiers = new Dictionary<Type, Dictionary<Type, EmitMapperBase>>();
    private static Dictionary<Type, Dictionary<Type, Func<MappingContext, object, object>>> mMapperFunctions = new Dictionary<Type, Dictionary<Type, Func<MappingContext, object, object>>>();
    private static Dictionary<Type, Dictionary<Type, Func<MappingContext, object, object>>> mCopierFunctions = new Dictionary<Type, Dictionary<Type, Func<MappingContext, object, object>>>();
    private static AssemblyBuilder mAssemblyBuilder;
    private static ModuleBuilder mModuleBuilder;
    private static AssemblyName mAssemblyNameBuilder;

    private static ReaderWriterLockSlim mLock = new ReaderWriterLockSlim(LockRecursionPolicy.SupportsRecursion);

    #endregion

    static EmitMapperFactory()
    {
    }

    static void InitAssembly()
    {
      var wNewAssemblyName = new AssemblyName(Guid.NewGuid() + "." + typeof(EmitMapperFactory).Assembly.GetName().Name);

      mAssemblyBuilder = AppDomain.CurrentDomain.DefineDynamicAssembly(
          wNewAssemblyName,
          System.Reflection.Emit.AssemblyBuilderAccess.RunAndSave);

      mModuleBuilder = mAssemblyBuilder.DefineDynamicModule(
          wNewAssemblyName.Name,
          wNewAssemblyName + ".dll");

      mAssemblyNameBuilder = mModuleBuilder.Assembly.GetName();
    }

    #region Public Methods

    public static EmitMapperBase<TSource, TTarget> GetMapper<TSource, TTarget>(bool copy)
      where TSource : class
      where TTarget : class, new()
    {
      return GetMapper<TSource, TTarget>(typeof(TSource), typeof(TTarget), copy);
    }

    public static EmitMapperBase GetMapper(Type sourceType, Type targetType, bool copy)
    {
      return (EmitMapperBase)typeof(EmitMapperFactory)
        .GetMethod("GetMapper", BindingFlags.Static | BindingFlags.NonPublic)
        .MakeGenericMethod(sourceType, targetType)
        .Invoke(null, new object[] { sourceType, targetType, copy });
    }

    public static object Map(Type sourceType, Type targetType, object value)
    {
      return Map(sourceType, targetType, value, new MappingContext(false));
    }

    public static object Map(Type sourceType, Type targetType, object value, MappingContext context)
    {
      return DoMap(sourceType, targetType, value, context, false);
    }

    public static object Copy(Type sourceType, Type targetType, object value)
    {
      return Copy(sourceType, targetType, value, new MappingContext(true));
    }

    public static object Copy(Type sourceType, Type targetType, object value, MappingContext context)
    {
      return DoMap(sourceType, targetType, value, context, true);
    }

    public static object DoMap(Type sourceType, Type targetType, object value, MappingContext context, bool copy)
    {
      Dictionary<Type, Func<MappingContext, object, object>> wDict;
      Func<MappingContext, object, object> wFunc;
      if ((copy ? mCopierFunctions : mMapperFunctions).TryGetValue(sourceType, out wDict) && wDict.TryGetValue(targetType, out wFunc))
      {
        return wFunc(context, value);
      }
      else
      {
        var mapper = (EmitMapperBase)typeof(EmitMapperFactory)
          .GetMethod("GetMapper", BindingFlags.Static | BindingFlags.NonPublic)
          .MakeGenericMethod(sourceType, targetType)
          .Invoke(null, new object[] { sourceType, targetType, copy });

        //TODO: Context
        return mapper
          .GetType()
          .GetMethod("Map", new Type[] { sourceType, targetType, typeof(MappingContext) })
          .Invoke(mapper, new object[] { value, null, context });
      }
    }

    #endregion

    #region Private Methods

    private static bool IsRecursiveMapping(Type sourceType, Type targetType, bool copy)
    {
      return (copy ? mCopiers : mMappers).ContainsKey(sourceType) && (copy ? mCopiers : mMappers)[sourceType].ContainsKey(targetType) && (copy ? mCopiers : mMappers)[sourceType][targetType] == null;
    }

    private static EmitMapperBase<TSource, TTarget> GetMapper<TSource, TTarget>(Type sourceType, Type targetType, bool copy)
    {
      EmitMapperBase wMapper = null;
      bool wWriteLockEntered = false;

      try
      {
        mLock.EnterUpgradeableReadLock();

        //Get target dictionary
        Dictionary<Type, EmitMapperBase> wTargetDict;
        Dictionary<Type, Func<MappingContext, object, object>> wFuncDict;
        if (!(copy ? mCopiers : mMappers).TryGetValue(sourceType, out wTargetDict))
        {
          mLock.EnterWriteLock();
          wWriteLockEntered = true;

          //Recheck so we don't work twice
          if (!(copy ? mCopiers : mMappers).TryGetValue(sourceType, out wTargetDict))
          {
            wTargetDict = new Dictionary<Type, EmitMapperBase>();
            (copy ? mCopiers : mMappers).Add(sourceType, wTargetDict);
            wFuncDict = new Dictionary<Type, Func<MappingContext, object, object>>();
            (copy ? mCopierFunctions : mMapperFunctions).Add(sourceType, wFuncDict);
          }
          else
          {
            wFuncDict = (copy ? mCopierFunctions : mMapperFunctions)[sourceType];
          }

          wWriteLockEntered = false;
          mLock.ExitWriteLock();
        }
        else
        {
          wFuncDict = (copy ? mCopierFunctions : mMapperFunctions)[sourceType];
        }

        //Get mapper
        if (!wTargetDict.TryGetValue(targetType, out wMapper) || wMapper == null)
        {
          mLock.EnterWriteLock();
          wWriteLockEntered = true;

          //Recheck so we don't work twice
          if (!wTargetDict.TryGetValue(targetType, out wMapper) || wMapper == null)
          {
            wTargetDict[targetType] = null;

            var wMapperType = GenerateMapperType<TSource, TTarget>(sourceType, targetType, copy);
            wMapper = (EmitMapperBase)Activator.CreateInstance(wMapperType);
            wTargetDict[targetType] = wMapper;

            wFuncDict[targetType] = new Func<MappingContext, object, object>((context, value) => { return EmitMapperBase<TSource, TTarget>.MapInstance((TSource)value, context); });
          }

          wWriteLockEntered = false;
          mLock.ExitWriteLock();
        }
      }
      catch (Exception ex)
      {
        mLogger.LogError(new EventId(), ex, "FastMapper GetMapper failed");
      }
      finally
      {
        if (wWriteLockEntered)
        {
          mLock.ExitWriteLock();
        }
        mLock.ExitUpgradeableReadLock();
      }

      return (EmitMapperBase<TSource, TTarget>)wMapper;
    }

    static int mDepth = 0;

    private static Type GenerateMapperType<TSource, TTarget>(Type sourceType, Type targetType, bool copy)
    {
      if (mDepth == 0)
      {
        InitAssembly();
      }

      mDepth++;

      #region Cache Fetch

      Type newType;

      #endregion

      #region Create the TypeBuilder

      var typeBuilder = mModuleBuilder.DefineType(
          (sourceType.FullName + "__" + targetType.FullName).Replace(".", "_"),
          TypeAttributes.Public | TypeAttributes.Class,
          typeof(EmitMapperBase<TSource, TTarget>)
          );

      #endregion

      #region Create the method

      AddMapMethod(typeBuilder, sourceType, targetType, copy);

      #endregion

      #region Create and return the defined type

      newType = typeBuilder.CreateType();


      mDepth--;

      //Write out the dll
      if (EmitMapper.SaveDllToDisk && mDepth == 0)
      {
        mAssemblyBuilder.Save(sourceType.Name + "-" + targetType.Name + (copy ? "-copy" : "-map") + ".dll");
      }

      return newType;

      #endregion
    }

    /// <summary>
    /// Add simple value assign
    /// </summary>
    private static void AddPropertyAssign(ILGenerator generator, PropertyInfo sourceProperty, PropertyInfo targetProperty, LocalBuilder target)
    {
      var setMethod = targetProperty.GetSetMethod();
      var getMethod = sourceProperty.GetGetMethod();

      //Load target
      generator.Emit(OpCodes.Ldloc, target);
      //Load source
      generator.Emit(OpCodes.Ldarg_1);

      //Get the source property value
      generator.EmitCall(OpCodes.Callvirt, getMethod, null);
      //Set the target property value
      generator.EmitCall(OpCodes.Callvirt, setMethod, null); //Set the property value
    }

    /// <summary>
    /// Add enum value assign
    /// </summary>
    private static void AddEnumAssign(ILGenerator generator, PropertyInfo sourceProperty, PropertyInfo targetProperty, LocalBuilder target)
    {
      var setMethod = targetProperty.GetSetMethod();
      var getMethod = sourceProperty.GetGetMethod();

      //Load target
      generator.Emit(OpCodes.Ldloc, target);

      //Load source
      generator.Emit(OpCodes.Ldarg_1);

      //Get the source property value
      generator.EmitCall(OpCodes.Callvirt, getMethod, null);
      //Set the target property value
      generator.EmitCall(OpCodes.Callvirt, setMethod, null); //Set the property value
    }

    /// <summary>
    /// Adds a foreach, current item is top of the stack
    /// </summary>
    /// <param name="enumerable">Enumerable to enumerate through</param>
    /// <param name="bodyBuilder">Action to call to build the body of foreach</param>
    private static void AddForeach(ILGenerator generator, LocalBuilder enumerable, Type enumerableType, Type itemType, Action<ILGenerator> bodyBuilder)
    {
      //Start foreach, source data
      generator.Emit(OpCodes.Ldloc, enumerable);
      var wGetEnumeratorMethod = enumerableType.GetMethod("GetEnumerator");
      generator.EmitCall(OpCodes.Callvirt, wGetEnumeratorMethod, null);
      var wEnumerator = generator.DeclareLocal(wGetEnumeratorMethod.ReturnType);
      generator.Emit(OpCodes.Stloc_S, wEnumerator);
      //Loop start
      var wLoopStart = generator.DefineLabel();
      var wLoopEnd = generator.DefineLabel();
      generator.MarkLabel(wLoopStart);

      //Go to next/first item
      var wEnumeratorNextMethod = wGetEnumeratorMethod.ReturnType.GetMethod("MoveNext");
      if (wEnumeratorNextMethod == null)
      {
        wEnumeratorNextMethod = typeof(IEnumerator).GetMethod("MoveNext");
      }
      if (wGetEnumeratorMethod.ReturnType.IsValueType)
      {
        generator.Emit(OpCodes.Ldloca, wEnumerator);
        generator.EmitCall(OpCodes.Call, wEnumeratorNextMethod, null);
      }
      else
      {
        generator.Emit(OpCodes.Ldloc, wEnumerator);
        generator.EmitCall(OpCodes.Callvirt, wEnumeratorNextMethod, null);
      }

      //Check if MoveNext was succesful, if not jump to end
      generator.Emit(OpCodes.Brfalse_S, wLoopEnd);

      var wEnumeratorCurrentGetMethod = wGetEnumeratorMethod.ReturnType.GetProperty("Current").GetGetMethod();
      //Get current item
      if (wGetEnumeratorMethod.ReturnType.IsValueType)
      {
        generator.Emit(OpCodes.Ldloca, wEnumerator);
        generator.EmitCall(OpCodes.Call, wEnumeratorCurrentGetMethod, null);
      }
      else
      {
        generator.Emit(OpCodes.Ldloc, wEnumerator);
        generator.EmitCall(OpCodes.Callvirt, wEnumeratorCurrentGetMethod, null);
        generator.Emit(OpCodes.Castclass, itemType);
      }

      bodyBuilder(generator);

      //Jump back to start
      generator.Emit(OpCodes.Br_S, wLoopStart);

      //Loop end
      generator.MarkLabel(wLoopEnd);
    }

    /// <summary>
    /// Add source enumerable to target enumerable mapping
    /// </summary>
    private static void AddEnumerableAssign(ILGenerator generator, PropertyInfo sourceProperty, PropertyInfo targetProperty, LocalBuilder target, bool copy)
    {
      var wSourceIsArray = sourceProperty.PropertyType.IsArray;
      var wTargetIsArray = targetProperty.PropertyType.IsArray;

      var wSourceItemType = wSourceIsArray ? sourceProperty.PropertyType.GetElementType() : sourceProperty.PropertyType.GetGenericArguments().FirstOrDefault();
      var wTargetItemType = wTargetIsArray ? targetProperty.PropertyType.GetElementType() : targetProperty.PropertyType.GetGenericArguments().FirstOrDefault();

      var wSourceEnumeratorType = typeof(IEnumerator<>).MakeGenericType(wSourceItemType);

      var wTargetEnumerableType = typeof(IEnumerable<>).MakeGenericType(wTargetItemType);

      var setMethod = targetProperty.GetSetMethod();
      var getMethod = sourceProperty.GetGetMethod();


      //Load target
      generator.Emit(OpCodes.Ldloc, target);
      //Load source
      generator.Emit(OpCodes.Ldarg_1);

      //Get the source property value
      generator.EmitCall(OpCodes.Callvirt, getMethod, null);

      //We will jump here (see MarkLabel)
      Label wElse = generator.DefineLabel();
      Label wEndIf = generator.DefineLabel();

      var wSourceData = generator.DeclareLocal(sourceProperty.PropertyType);
      generator.Emit(OpCodes.Stloc, wSourceData);
      generator.Emit(OpCodes.Ldloc, wSourceData);

      //If null jump to wEnd
      generator.Emit(OpCodes.Brfalse_S, wElse);

      LocalBuilder wTarget = null;

      //Change only the container
      if ((!copy || wSourceItemType == typeof(string) || wSourceItemType.IsPrimitive) && wSourceItemType == wTargetItemType)
      {
        //Both can't be array because it would be the same type
        //Special case target is array
        if (wTargetIsArray)
        {
          var wToArrayMethod = typeof(System.Linq.Enumerable).GetMethods().First(f => f.Name == "ToArray" && f.IsGenericMethod).MakeGenericMethod(wSourceItemType);

          generator.Emit(OpCodes.Ldloc, wSourceData);
          generator.EmitCall(OpCodes.Call, wToArrayMethod, null);

          wTarget = generator.DeclareLocal(targetProperty.PropertyType);
          generator.Emit(OpCodes.Stloc, wTarget);
        }
        //Target is not array we try to add to it
        else
        {
          var wTargetConstructor = targetProperty.PropertyType.GetConstructor(new Type[] { wTargetEnumerableType });

          //Items can be added through constructor
          if (wTargetConstructor != null)
          {
            generator.Emit(OpCodes.Ldloc, wSourceData);
            generator.Emit(OpCodes.Newobj, wTargetConstructor);

            wTarget = generator.DeclareLocal(targetProperty.PropertyType);
            generator.Emit(OpCodes.Stloc, wTarget);
          }
          else
          {
            wTargetConstructor = targetProperty.PropertyType.GetConstructor(Type.EmptyTypes);

            if (wTargetConstructor != null)
            {
              wTarget = generator.DeclareLocal(targetProperty.PropertyType);
              generator.Emit(OpCodes.Newobj, wTargetConstructor);
              generator.Emit(OpCodes.Stloc, wTarget);

              //Try AddRange
              var wAddMethod = targetProperty.PropertyType.GetMethod("AddRange", new Type[] { wTargetEnumerableType });
              if (wAddMethod != null)
              {
                generator.Emit(OpCodes.Ldloc, wTarget);
                generator.Emit(OpCodes.Ldloc, wSourceData);
                generator.EmitCall(OpCodes.Callvirt, wAddMethod, null);
              }
              //Try Add
              else if ((wAddMethod = targetProperty.PropertyType.GetMethod("Add", new Type[] { wTargetItemType })) != null)
              {
                AddForeach(generator, wSourceData, sourceProperty.PropertyType, wSourceItemType, (g) =>
                {
                  //Get target collection
                  g.Emit(OpCodes.Ldloc, wTarget);

                  //Add the item
                  g.EmitCall(OpCodes.Callvirt, wAddMethod, null);
                });
              }
              else
              {
                //Can't map
              }
            }
            else
            {
              //Can't map
            }
          }
        }
      }
      //Map items
      else
      {
        //Special case target is array
        if (wTargetIsArray)
        {
          //Load source data
          generator.Emit(OpCodes.Ldloc, wSourceData);
          //If array get length
          if (wSourceIsArray)
          {
            generator.Emit(OpCodes.Ldlen);
          }
          //Else get count
          else
          {
            var wCountMethod = sourceProperty.PropertyType.GetMethod("Count");
            if (wCountMethod != null)
            {
              generator.EmitCall(OpCodes.Callvirt, wCountMethod, null);
            }
            else
            {
              var wCountProperty = sourceProperty.PropertyType.GetProperty("Count");
              if (wCountProperty != null)
              {
                generator.EmitCall(OpCodes.Callvirt, wCountProperty.GetGetMethod(), null);
              }
              else
              {
                throw new NotImplementedException();
              }
            }
          }

          //Create target array
          generator.Emit(OpCodes.Newarr, wTargetItemType);

          //Store target array
          wTarget = generator.DeclareLocal(targetProperty.PropertyType);
          generator.Emit(OpCodes.Stloc, wTarget);

          var wItem = generator.DeclareLocal(wSourceItemType);
          var wIndex = generator.DeclareLocal(typeof(int));

          AddForeach(generator, wSourceData, sourceProperty.PropertyType, wSourceItemType, (g) =>
          {
            g.Emit(OpCodes.Stloc, wItem);

            //Get target collection
            g.Emit(OpCodes.Ldloc, wTarget);
            //Load index
            g.Emit(OpCodes.Ldloc, wIndex);
            //Map item
            AddMapping(g, wSourceItemType, wTargetItemType, wItem, copy);

            //Add the item
            g.Emit(OpCodes.Stelem_Ref);

            g.Emit(OpCodes.Ldloc, wIndex);
            g.Emit(OpCodes.Ldc_I4_1);
            g.Emit(OpCodes.Add);
            g.Emit(OpCodes.Stloc, wIndex);
          });
        }
        //Target is not array we try to add to it
        else
        {
          var wTargetConstructor = targetProperty.PropertyType.GetConstructor(Type.EmptyTypes);

          if (wTargetConstructor != null)
          {
            wTarget = generator.DeclareLocal(targetProperty.PropertyType);
            generator.Emit(OpCodes.Newobj, wTargetConstructor);
            generator.Emit(OpCodes.Stloc, wTarget);

            var wAddMethod = targetProperty.PropertyType.GetMethod("Add", new Type[] { wTargetItemType });
            if (wAddMethod != null)
            {
              var wItem = generator.DeclareLocal(wSourceItemType);
              AddForeach(generator, wSourceData, sourceProperty.PropertyType, wSourceItemType, (g) =>
              {
                g.Emit(OpCodes.Stloc, wItem);

                //Get target collection
                g.Emit(OpCodes.Ldloc, wTarget);

                AddMapping(g, wSourceItemType, wTargetItemType, wItem, copy);

                //Add the item
                g.EmitCall(OpCodes.Callvirt, wAddMethod, null);
              });
            }
            else
            {
              //Can't map
            }
          }
          else
          {
            //Can't map
          }
        }
      }

      //Can't map
      if (wTarget == null)
      {
        generator.Emit(OpCodes.Ldnull);
      }
      //Load mapped
      else
      {
        generator.Emit(OpCodes.Ldloc, wTarget);
      }

      //Jump to end if
      generator.Emit(OpCodes.Br_S, wEndIf);

      //Jump here if orig value is null
      generator.MarkLabel(wElse);

      generator.Emit(OpCodes.Ldnull);

      generator.MarkLabel(wEndIf);

      //Set the target property value
      generator.EmitCall(OpCodes.Callvirt, setMethod, null); //Set the property value
    }

    private static void AddMapping(ILGenerator generator, Type sourceType, Type targetType, LocalBuilder sourceData, bool copy)
    {
      //Use if we have circular reference (slow reflection based)
      if (IsRecursiveMapping(sourceType, targetType, copy))
      {
        //Get mapper
        generator.Emit(OpCodes.Ldtoken, sourceType);
        generator.Emit(OpCodes.Call, typeof(Type).GetMethod("GetTypeFromHandle", BindingFlags.Static | BindingFlags.Public));
        generator.Emit(OpCodes.Ldtoken, targetType);
        generator.Emit(OpCodes.Call, typeof(Type).GetMethod("GetTypeFromHandle", BindingFlags.Static | BindingFlags.Public));

        generator.Emit(OpCodes.Ldloc, sourceData);
        generator.Emit(OpCodes.Ldarg_3);

        //Call map
        generator.EmitCall(OpCodes.Call, typeof(EmitMapperFactory).GetMethod(copy ? "Copy" : "Map", new Type[] { typeof(Type), typeof(Type), typeof(object), typeof(MappingContext) }), null);
        generator.Emit(OpCodes.Castclass, targetType);
      }
      //Fast without circular reference
      else
      {
        generator.Emit(OpCodes.Ldloc, sourceData);
        generator.Emit(OpCodes.Ldarg_3);

        var wMapperMethod = EmitMapperFactory.GetMapper(sourceType, targetType, copy).GetType().GetMethod("MapInstance", BindingFlags.Static | BindingFlags.Public | BindingFlags.FlattenHierarchy);

        generator.EmitCall(OpCodes.Call, wMapperMethod, null);
      }

    }

    /// <summary>
    /// Add assign with mapping
    /// </summary>
    private static void AddMapAssign(ILGenerator generator, PropertyInfo sourceProperty, PropertyInfo targetProperty, LocalBuilder target, bool copy)
    {
      var setMethod = targetProperty.GetSetMethod();
      var getMethod = sourceProperty.GetGetMethod();

      //Load target
      generator.Emit(OpCodes.Ldloc, target);
      //Load source
      generator.Emit(OpCodes.Ldarg_1);

      //Get the source property value
      generator.EmitCall(OpCodes.Callvirt, getMethod, null);

      //We will jump here (see MarkLabel)
      Label wElse = generator.DefineLabel();
      Label wEndIf = generator.DefineLabel();

      var wSourceData = generator.DeclareLocal(sourceProperty.PropertyType);
      generator.Emit(OpCodes.Stloc, wSourceData);
      generator.Emit(OpCodes.Ldloc, wSourceData);

      //If null jump to wEnd
      generator.Emit(OpCodes.Brfalse_S, wElse);

      AddMapping(generator, sourceProperty.PropertyType, targetProperty.PropertyType, wSourceData, copy);

      //Jump to end if
      generator.Emit(OpCodes.Br_S, wEndIf);

      //Jump here if orig value is null
      generator.MarkLabel(wElse);

      generator.Emit(OpCodes.Ldnull);

      generator.MarkLabel(wEndIf);

      //Set the target property value
      generator.EmitCall(OpCodes.Callvirt, setMethod, null); //Set the property value
    }

    /// <summary>
    /// Overrides Map method in MapperBase
    /// </summary>
    private static MethodBuilder AddMapMethod(TypeBuilder typeBuilder, Type sourceType, Type targetType, bool copy)
    {
      var wMethod = typeBuilder.DefineMethod(
          "DoMap",
          MethodAttributes.Family | MethodAttributes.Virtual | MethodAttributes.ReuseSlot | MethodAttributes.HideBySig,
          targetType,
          new Type[] { sourceType, targetType, typeof(MappingContext) }
          );

      var wMethodBody = wMethod.GetILGenerator();

      //Abstract class can't be created
      //It will be handled with inheritency
      if (targetType.IsAbstract)
      {
        wMethodBody.Emit(OpCodes.Ldnull);

        //Returns null
        wMethodBody.Emit(OpCodes.Ret);
      }
      else
      {
        var wConstructor = targetType.GetConstructor(System.Type.EmptyTypes);

        if (wConstructor == null)
        {
          throw new InvalidOperationException("There is no parameterless contructor for type '" + targetType.FullName + "'.");
        }

        var wElse = wMethodBody.DefineLabel();
        var wEndIf = wMethodBody.DefineLabel();

        //We check if the target is null
        wMethodBody.Emit(OpCodes.Ldarg_2);
        wMethodBody.Emit(OpCodes.Brtrue_S, wElse);

        //Target is null create it
        wMethodBody.Emit(OpCodes.Newobj, wConstructor);
        wMethodBody.Emit(OpCodes.Br_S, wEndIf);

        wMethodBody.MarkLabel(wElse);

        //Target is not null push back to stack
        wMethodBody.Emit(OpCodes.Ldarg_2);

        wMethodBody.MarkLabel(wEndIf);

        var wTarget = wMethodBody.DeclareLocal(targetType);
        wMethodBody.Emit(OpCodes.Stloc, wTarget);

        wMethodBody.Emit(OpCodes.Ldarg_3);
        wMethodBody.Emit(OpCodes.Ldtoken, sourceType);
        wMethodBody.Emit(OpCodes.Call, typeof(Type).GetMethod("GetTypeFromHandle", BindingFlags.Static | BindingFlags.Public));
        wMethodBody.Emit(OpCodes.Ldtoken, targetType);
        wMethodBody.Emit(OpCodes.Call, typeof(Type).GetMethod("GetTypeFromHandle", BindingFlags.Static | BindingFlags.Public));
        wMethodBody.Emit(OpCodes.Ldarg_1);
        wMethodBody.Emit(OpCodes.Box, sourceType);
        wMethodBody.Emit(OpCodes.Ldloc, wTarget);
        wMethodBody.Emit(OpCodes.Box, targetType);

        var wAddMethod = typeof(MappingContext).GetMethod("AddMapped");

        wMethodBody.EmitCall(OpCodes.Callvirt, wAddMethod, null);

        var wGetProperties = sourceType.GetProperties();
        var wSetProperties = targetType.GetProperties().ToDictionary(d => d.Name);

        PropertyInfo targetProperty;

        foreach (var sourceProperty in wGetProperties)
        {
          if (EmitMapper.mIgnoreMemberTypes.Contains(sourceProperty.PropertyType)) continue;
          if (sourceProperty.CanRead && wSetProperties.ContainsKey(sourceProperty.Name))
          {
            targetProperty = wSetProperties[sourceProperty.Name];
            if (targetProperty.CanWrite)
            {
              if (sourceProperty.PropertyType == targetProperty.PropertyType && (!copy || sourceProperty.PropertyType.IsValueType || sourceProperty.PropertyType == typeof(string)))
              {
                //Simple assign
                AddPropertyAssign(wMethodBody, sourceProperty, targetProperty, wTarget);
              }
              else if (sourceProperty.PropertyType == typeof(string) || targetProperty.PropertyType == typeof(string))
              {
                //If source xor target is string we don't do anything
              }
              else if (sourceProperty.PropertyType.IsClass && targetProperty.PropertyType.IsClass)
              {
                //If it is IEnumerable than we have to go through elements
                if (typeof(IEnumerable).IsAssignableFrom(sourceProperty.PropertyType) &&
                    (sourceProperty.PropertyType.IsArray || sourceProperty.PropertyType.GetGenericArguments().Length > 0))
                {
                  AddEnumerableAssign(wMethodBody, sourceProperty, targetProperty, wTarget, copy);
                }
                //Simple object mapping
                else
                {
                  AddMapAssign(wMethodBody, sourceProperty, targetProperty, wTarget, copy);
                }
              }
              else if (sourceProperty.PropertyType.IsEnum && targetProperty.PropertyType.IsEnum)
              {
                AddEnumAssign(wMethodBody, sourceProperty, targetProperty, wTarget);
              }
              else
              {
                var wSourceNullable = Nullable.GetUnderlyingType(sourceProperty.PropertyType);
                var wTargetNullable = Nullable.GetUnderlyingType(targetProperty.PropertyType);
                if (wSourceNullable != null & wTargetNullable != null && wSourceNullable.IsEnum &&
                    wTargetNullable.IsEnum)
                {
                  AddEnumAssign(wMethodBody, sourceProperty, targetProperty, wTarget);
                }
                else
                {
                  throw new InvalidOperationException(string.Format("Current type can't be mapped with fast mapper Source: {0}: {1}, Target: {2}: {3}", sourceProperty.Name, sourceProperty.PropertyType, targetProperty.Name, targetProperty.PropertyType));
                }
              }
            }
          }
        }

        wMethodBody.Emit(OpCodes.Ldloc, wTarget);

        //Returns wTarget
        wMethodBody.Emit(OpCodes.Ret);
      }

      return wMethod;
    }

    #endregion
  }
}
