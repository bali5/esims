using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace eSims.Tools
{
  public static class ApplicationLogging
  {
    public static ILoggerFactory LoggerFactory { get; } = new LoggerFactory().AddConsole().AddDebug();
    public static ILogger CreateLogger<T>() => LoggerFactory.CreateLogger<T>();
    public static ILogger CreateLogger(Type type) => LoggerFactory.CreateLogger(type);
  }
}
