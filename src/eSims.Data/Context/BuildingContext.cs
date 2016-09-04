using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Building;
using eSims.Data.Helpers;
using eSims.Data.HumanResources;
using eSims.Data.Workflow;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Context
{
  public class BuildingContext : ESimsContext
  {
    public BuildingContext()
      : base("temp")
    {
    }

    public BuildingContext(string path)
      : base(path)
    {
    }

    protected override void OnEnsureSeedData()
    {
      ApplySeed("BaseData", BaseData);
    }

    private void BaseData()
    {
      AccountRows.Add(new AccountRow()
      {
        Subject = "Starting funds",
        Value = 20
      });

      var wFloor = new Floor() {
        Level = 0,
        Left = 6,
        Top = 6,
        Width = 4,
        Height = 8
      };

      wFloor.Rooms.Add(new Room()
      {
        Left = 0,
        Top = 0,
        Width = 4,
        Height = 4,
        Name = "Elevator",
        FloorId = 1
      });

      for (var y = 4; y < 8; y++)
      {
        for (var x = 0; x < 4; x++)
        {
          wFloor.Rooms.Add(new Room()
          {
            Left = x,
            Top = y,
            Width = 1,
            Height = 1,
            Name = "Floor",
            FloorId = 1
          });
        }
      }

      Floors.Add(wFloor);

      wFloor = new Floor() {
        Level = 1,
        Width = 16,
        Height = 16
      };

      wFloor.Rooms.Add(new Room()
      {
        Left = 6,
        Top = 6,
        Width = 4,
        Height = 4,
        Name = "Elevator",
        FloorId = 2
      });

      Floors.Add(wFloor);

      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
      Persons.Add(PersonHelper.GetRandomPerson());
    }

    public DbSet<AccountRow> AccountRows { get; set; }

    public DbSet<Floor> Floors { get; set; }
    public DbSet<Room> Rooms { get; set; }

    public DbSet<Team> Teams { get; set; }
    public DbSet<Person> Persons { get; set; }

    public DbSet<Project> Projects { get; set; }

  }
}
