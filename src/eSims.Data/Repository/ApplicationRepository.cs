using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Application;
using eSims.Data.Context;
using eSims.Data.Helpers;

namespace eSims.Data.Repository
{
  public class ApplicationRepository : IApplicationRepository
  {
    ApplicationContext mContext;

    public ApplicationRepository()
    {
      mContext = new ApplicationContext();
      mContext.Database.EnsureCreated();
    }

    public int CreateGame(string name)
    {
      var wGame = new Game()
      {
        Name = name,
        DataFilePath = $@".\Data\{Guid.NewGuid()}.sqlite"
      };

      wGame = mContext.Games.Add(wGame).Entity;

      mContext.SaveChanges();

      var wBuildingContext = new BuildingContext(wGame.DataFilePath);

      wBuildingContext.Database.EnsureCreated();

      wBuildingContext.AccountRows.Add(new Building.AccountRow()
      {
        Subject = "Starting funds",
        Value = 20
      });

      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());
      wBuildingContext.Persons.Add(PersonHelper.GetRandomPerson());

      return wGame.Id;
    }

    public Game GetGame(string sessionId)
    {
      return mContext.Games.FirstOrDefault(f => f.SessionId == sessionId);
    }

    public IEnumerable<Game> GetGames()
    {
      return mContext.Games.ToArray();
    }
  }
}
