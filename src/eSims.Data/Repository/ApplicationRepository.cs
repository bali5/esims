using System;
using System.Collections.Generic;
using System.Linq;
using eSims.Data.Application;
using eSims.Data.Context;
using eSims.Data.Helpers;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Repository
{
  public class ApplicationRepository : IApplicationRepository
  {
    ApplicationContext mContext;

    public ApplicationRepository()
    {
      mContext = new ApplicationContext();
      mContext.Database.Migrate();
      mContext.EnsureSeedData();
    }

    public int CreateGame(string name)
    {
      var wGame = new Game()
      {
        Name = name,
        DataFilePath = $@"./{Guid.NewGuid()}.sqlite",
        UserId = mContext.Users.First().Id
      };

      wGame = mContext.Games.Add(wGame).Entity;

      mContext.SaveChanges();

      var wBuildingContext = new BuildingContext(wGame.DataFilePath);

      wBuildingContext.Database.Migrate();

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

      wBuildingContext.SaveChanges();

      return wGame.Id;
    }

    public void DeleteGame(int id)
    {
      mContext.Games.Remove(mContext.Games.FirstOrDefault(f => f.Id == id));
    }

    public Game GetGame(int id)
    {
      return mContext.Games.FirstOrDefault(f => f.Id == id);
    }

    public IEnumerable<Game> GetGames()
    {
      return mContext.Games.ToArray();
    }
  }
}
