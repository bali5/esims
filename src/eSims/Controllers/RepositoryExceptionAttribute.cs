using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using eSims.Data.Repository;
using Microsoft.AspNetCore.Mvc.Filters;

namespace eSims.Controllers
{
  public class RepositoryExceptionAttribute : ExceptionFilterAttribute
  {
    public override void OnException(ExceptionContext context)
    {
      if (context.Exception is RepositoryException)
      {
        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError)
        {
          Content = new StringContent("Repository error!"),
          ReasonPhrase = context.Exception.Message
        });
      }
    }
  }
}
