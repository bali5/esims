using System;
using System.Collections.Generic;
using System.Linq;
using eSims.Data.Application;
using eSims.Data.Building;
using eSims.Data.Context;
using eSims.Data.Helpers;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Repository
{
  public class ApplicationRepository : ESimsRepository<ApplicationContext>, IApplicationRepository
  {
    public int CreateGame(string name)
    {
      var wGame = new Game()
      {
        Name = name,
        DataFileName = Guid.NewGuid().ToString(),
        UserId = Context.Users.First().Id
      };

      wGame = Context.Games.Add(wGame).Entity;

      Context.SaveChanges();

      var wBuildingRepository = new BuildingRepository(wGame.DataFileName);

      return wGame.Id;
    }

    public void DeleteGame(int id)
    {
      Context.Games.Remove(Context.Games.FirstOrDefault(f => f.Id == id));
    }

    public Game GetGame(int id)
    {
      return Context.Games.FirstOrDefault(f => f.Id == id);
    }

    public IEnumerable<Game> GetGames()
    {
      return Context.Games.ToArray();
    }
  }
}
