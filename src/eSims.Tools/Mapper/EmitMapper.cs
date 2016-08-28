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
  public static class EmitMapper
  {
    public static bool SaveDllToDisk { get; set; }

    //TODO: refactor add configuration remove this trash0
    internal static Type[] mIgnoreMemberTypes = new Type[] { };

    public static TTarget Map<TTarget>(object source)
      where TTarget : class, new()
    {
      if (source == null)
      {
        return null;
      }

      MappingContext wContext = new MappingContext(false);

      return (TTarget)EmitMapperFactory.Map(source.GetType(), typeof(TTarget), source, wContext);
    }

    public static TTarget Copy<TTarget>(object source)
      where TTarget : class, new()
    {
      if (source == null)
      {
        return null;
      }

      MappingContext wContext = new MappingContext(true);

      return (TTarget)EmitMapperFactory.Copy(source.GetType(), typeof(TTarget), source, wContext);
    }

    public static TTarget Map<TSource, TTarget>(TSource source)
      where TSource : class
      where TTarget : class, new()
    {
      MappingContext wContext = new MappingContext(false);

      return EmitMapperFactory.GetMapper<TSource, TTarget>(false).Map(source, null, wContext);
    }

    public static TTarget Map<TSource, TTarget>(TSource source, TTarget target)
      where TSource : class
      where TTarget : class, new()
    {
      MappingContext wContext = new MappingContext(false);

      return EmitMapperFactory.GetMapper<TSource, TTarget>(false).Map(source, target, wContext);
    }

    public static TTarget Copy<TSource, TTarget>(TSource source)
      where TSource : class
      where TTarget : class, new()
    {
      MappingContext wContext = new MappingContext(true);

      return EmitMapperFactory.GetMapper<TSource, TTarget>(true).Map(source, null, wContext);
    }
  }

}
