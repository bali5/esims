﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Building;
using eSims.Data.Helpers;
using eSims.Data.HumanResources;
using eSims.Data.Repository;
using eSims.Data.Workflow;
using eSims.Tools.Mapper;
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
      Stats.Add(new BuildingStats()
      {
        Account = 20,
        StartTime = DateTime.UtcNow,
        SimulationTime = new DateTime(2016, 1, 1, 8, 0, 0),
        PlayTime = 0d,
        Speed = 120,
        Persons = 0
      });

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

      var wCommon = new CommonRepository();
      var wCommonPersons = wCommon.GetPersons();

      if (wCommonPersons.Any())
      {
        var wPersons = wCommonPersons.Select(EmitMapper.Map<Person, Person>).ToArray();

        var wAvailables = new HashSet<int>();

        var wRnd = new Random();

        for (var i = 0; i < wPersons.Length; i++)
        {
          wPersons[i].State = PersonState.NotAvailable;
        }
        while (wAvailables.Count < 15 && wAvailables.Count < wPersons.Length)
        {
          var wIndex = wRnd.Next(wPersons.Length);
          if (wAvailables.Add(wIndex))
          {
            wPersons[wIndex].State = PersonState.Available;
          }
        }

        Persons.AddRange(wPersons);
      }
      else
      {
        for (var i = 0; i < 15; i++)
        {
          Persons.Add(PersonHelper.GetRandomPerson(PersonState.Available));
        }
        for (var i = 0; i < 95; i++)
        {
          Persons.Add(PersonHelper.GetRandomPerson(PersonState.NotAvailable));
        }
      }
    }

    public DbSet<BuildingStats> Stats { get; set; }

    public DbSet<AccountRow> AccountRows { get; set; }

    public DbSet<Floor> Floors { get; set; }
    public DbSet<Room> Rooms { get; set; }

    public DbSet<Team> Teams { get; set; }
    public DbSet<Person> Persons { get; set; }

    public DbSet<Project> Projects { get; set; }

  }
}
