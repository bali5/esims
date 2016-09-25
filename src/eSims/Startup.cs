using System.Threading.Tasks;
using eSims.Data.Repository;
using eSims.Tools;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System.Linq;
using eSims.Websockets;
using System;

namespace eSims
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

      if (env.IsEnvironment("Development"))
      {
        // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
        builder.AddApplicationInsightsSettings(developerMode: true);
      }

      builder.AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
      // Add framework services.
      services.AddApplicationInsightsTelemetry(Configuration);

      services.AddMvc();

      services.AddSingleton<IApplicationRepository, ApplicationRepository>();
      services.AddSingleton<ILoggerFactory>((s) => ApplicationLogging.LoggerFactory);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
    {
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      loggerFactory.AddDebug();

      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseApplicationInsightsRequestTelemetry();

      app.UseApplicationInsightsExceptionTelemetry();

      app.UseWebSockets();

      app.Use(async (context, next) =>
      {
        if (context.WebSockets.IsWebSocketRequest)
        {
          await SimulatorSocket.Create(context, serviceProvider.GetService<IApplicationRepository>());
        }
        else
        {
          await next();
        }
      });

      app.UseMvc();

      app.Use(async (context, next) =>
      {
        loggerFactory.CreateLogger("Unknown route").LogWarning(context.Request.Path);
        context.Response.Redirect($"http://{context.Request.Host}");
        await Task.FromResult(false);
      });
    }
  }
}
