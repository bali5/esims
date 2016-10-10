using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;

namespace eSims
{
  public class Program
  {
    public static void Main(string[] args)
    {
      AppDomain.CurrentDomain.UnhandledException += CurrentDomain_UnhandledException;
      TaskScheduler.UnobservedTaskException += TaskScheduler_UnobservedTaskException;

      var host = new WebHostBuilder()
          .UseKestrel(options =>
          {
            options.NoDelay = true;
            //options.UseHttps("eSims.pfx", "eSims");
            //options.UseConnectionLogging();
          })
          .UseUrls("https://localhost:5000")
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseIISIntegration()
          .UseStartup<Startup>()
          .Build();

      host.Run();
    }

    private static void TaskScheduler_UnobservedTaskException(object sender, UnobservedTaskExceptionEventArgs e)
    {
      Console.WriteLine(e.Exception.Message);
      Console.WriteLine(e.Exception.StackTrace);
    }

    private static void CurrentDomain_UnhandledException(object sender, UnhandledExceptionEventArgs e)
    {
      Console.WriteLine(((Exception)e.ExceptionObject).Message);
      Console.WriteLine(((Exception)e.ExceptionObject).StackTrace);
    }

  }
}
