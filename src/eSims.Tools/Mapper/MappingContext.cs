using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Tools.Mapper
{
  public class MappingContext
  {
    public MappingContext(bool copy)
    {
      IsCopy = copy;
    }

    Dictionary<Type, Dictionary<Type, Dictionary<object, object>>> mMappings = new Dictionary<Type, Dictionary<Type, Dictionary<object, object>>>();

    public bool TryGetMapped(Type typeSource, Type typeTarget, object original, out object mapped)
    {
      Dictionary<Type, Dictionary<object, object>> wSourceDict;
      Dictionary<object, object> wTargetDict;
      if (mMappings.TryGetValue(typeSource, out wSourceDict) && wSourceDict.TryGetValue(typeTarget, out wTargetDict) && wTargetDict.TryGetValue(original, out mapped))
      {
        return true;
      }
      else
      {
        mapped = null;
        return false;
      }
    }

    public void AddMapped(Type sourceType, Type targetType, object original, object mapped)
    {
      Dictionary<Type, Dictionary<object, object>> wSourceDict;
      Dictionary<object, object> wTargetDict;
      if (!mMappings.TryGetValue(sourceType, out wSourceDict))
      {
        wSourceDict = new Dictionary<Type, Dictionary<object, object>>();
        mMappings[sourceType] = wSourceDict;
      }
      if (!wSourceDict.TryGetValue(targetType, out wTargetDict))
      {
        wTargetDict = new Dictionary<object, object>();
        wSourceDict[targetType] = wTargetDict;
      }

      wTargetDict[original] = mapped;
    }

    public bool IsCopy { get; set; }

    public int Count { get; set; }
  }

}
