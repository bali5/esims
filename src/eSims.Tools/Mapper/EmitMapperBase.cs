using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Tools.Mapper
{
  public abstract class EmitMapperBase
  {
  }

  public abstract class EmitMapperBase<TSource, TTarget> : EmitMapperBase
  {
    public EmitMapperBase()
    {
      Instance = this;
    }

    public static EmitMapperBase<TSource, TTarget> Instance { get; private set; }

    protected abstract TTarget DoMap(TSource source, TTarget target, MappingContext context);

    public TTarget Map(TSource source, TTarget target, MappingContext context)
    {
      //This handles inheritency
      //If the source type is descendent of TTarget than we will use TTarget not TSource
      Type wSourceType = source.GetType();
      if (typeof(TTarget) != wSourceType && typeof(TTarget).IsAssignableFrom(wSourceType) && context.Count > 0)
      {
        if (context.IsCopy)
        {
          return (TTarget)EmitMapperFactory.Copy(wSourceType, wSourceType, source, context);
        }
        else
        {
          return (TTarget)EmitMapperFactory.Map(wSourceType, wSourceType, source, context);
        }
      }
      else
      {
        context.Count++;

        object wMappedObject;

        if (context.TryGetMapped(typeof(TSource), typeof(TTarget), source, out wMappedObject))
        {
          return (TTarget)wMappedObject;
        }

        return Instance.DoMap(source, target, context);
      }

    }

    public static TTarget MapInstance(TSource source, MappingContext context)
    {
      return Instance.Map(source, default(TTarget), context);
    }
  }

}
