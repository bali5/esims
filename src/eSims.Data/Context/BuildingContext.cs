using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Building;
using eSims.Data.HumanResources;
using eSims.Data.Workflow;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Context
{
  public class BuildingContext : DbContext
  {
    private string mPath = "./temp.sqlite";

    public BuildingContext()
        : base()
    {
    }

    public BuildingContext(string path)
            : base()
    {
      mPath = path;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite($"Filename={mPath}");

      base.OnConfiguring(optionsBuilder);
    }

    public DbSet<AccountRow> AccountRows { get; set; }

    public DbSet<Floor> Floors { get; set; }
    public DbSet<Room> Rooms { get; set; }

    public DbSet<Team> Teams { get; set; }
    public DbSet<Person> Persons { get; set; }

    public DbSet<Project> Projects { get; set; }

  }
}
