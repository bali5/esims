﻿using System;
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

      Floors.Add(new Floor() { Level = 0 });

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
