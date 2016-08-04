using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Application;
using eSims.Data.Context;

namespace eSims.Data.Repository
{
  public class ApplicationRepository : IApplicationRepository
  {
    ApplicationContext mContext;

    public ApplicationRepository()
    {
      mContext = new ApplicationContext();
    }

    public Game GetGame(string sessionId)
    {
      return mContext.Games.FirstOrDefault(f => f.SessionId == sessionId);
    }

  }
}
