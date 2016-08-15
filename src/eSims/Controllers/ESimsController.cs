using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data;
using eSims.Data.Application;
using eSims.Data.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

namespace eSims.Controllers
{
  public abstract class ESimsController : Controller
  {
    protected IApplicationRepository ApplicationRepository { get; private set; }
    protected IBuildingRepository BuildingRepository { get; private set; }
    protected Game Game { get; private set; }

    protected ESimsController(IApplicationRepository applicationRepository)
    {
      ApplicationRepository = applicationRepository;
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
      base.OnActionExecuting(context);

      StringValues wValue;
      if (context.HttpContext.Request.Headers.TryGetValue("Referer", out wValue))
      {
        var wReferer = wValue.FirstOrDefault();
        if (string.IsNullOrWhiteSpace(wReferer) || !InitializeController(wReferer))
        {
          context.Result = BadRequest();
        }
      }
      else
      {
        context.Result = BadRequest();
      }
    }

    private bool InitializeController(string referer)
    {
      var wUri = new Uri(referer);

      int wId;
      if (!int.TryParse(Path.GetFileName(wUri.AbsolutePath), out wId)) return false;

      Game = ApplicationRepository.GetGame(wId);

      if (Game == null) return false;

      //if (!System.IO.File.Exists(Game.DataFilePath)) return false;

      BuildingRepository = new BuildingRepository(Game.DataFileName);

      return true;
    }

  }
}
