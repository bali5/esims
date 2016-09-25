using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace eSims.Extensions
{
  public static class HttpContextExtensions
  {
    public static string GetHeader(this HttpContext context, string name)
    {
      StringValues wValue;
      if (context.Request.Headers.TryGetValue(name, out wValue))
      {
        return wValue.FirstOrDefault();
      }
      return null;
    }

  }
}
