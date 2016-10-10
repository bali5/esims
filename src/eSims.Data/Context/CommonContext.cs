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
  public class CommonContext : ESimsContext
  {
    public CommonContext()
        : base("common")
    {
    }

    protected override void OnEnsureSeedData()
    {
      ApplySeed("SeedRoomTemplates001", SeedRoomTemplates001);
    }

    private void SeedRoomTemplates001()
    {
      Rooms.AddRange(new[] {
        new RoomTemplate()
        {
          Name = "Elevator",
          Width = 4,
          Height = 4,
          Icon = "vertical_align_center",
          IsSystemOnly = true
        },
        new RoomTemplate()
        {
          Name = "Floor",
          Width = 1,
          Height = 1,
          Icon = "open_with",
          Price = 0.02
        },
        new RoomTemplate()
        {
          Name = "Developer room, small",
          Width = 4,
          Height = 4,
          WorkplaceMaxCount = 5,
          Icon = "computer",
          Price = 2
        },
        new RoomTemplate()
        {
          Name = "Developer room, medium",
          Width = 8,
          Height = 4,
          WorkplaceMaxCount = 11,
          Icon = "computer",
          Price = 5
        },
        new RoomTemplate()
        {
          Name = "Developer room, large",
          Width = 16,
          Height = 6,
          WorkplaceMaxCount = 30,
          Icon = "computer",
          Price = 15
        },
        new RoomTemplate()
        {
          Name = "Bathroom, small",
          Width = 1,
          Height = 2,
          BathroomMaxCount = 1,
          Icon = "wc",
          Price = 1.5
        },
        new RoomTemplate()
        {
          Name = "Bathroom, medium",
          Width = 2,
          Height = 2,
          BathroomMaxCount = 1,
          Icon = "wc",
          Price = 2
        },
        new RoomTemplate()
        {
          Name = "Kitchen, small",
          Width = 1,
          Height = 2,
          KitchenMaxCount = 2,
          Icon = "kitchen",
          Price = 1.5
        },
        new RoomTemplate()
        {
          Name = "Kitchen, medium",
          Width = 2,
          Height = 3,
          KitchenMaxCount = 5,
          Icon = "kitchen",
          Price = 2
        },
        new RoomTemplate()
        {
          Name = "Kitchen, large",
          Width = 16,
          Height = 6,
          KitchenMaxCount = 50,
          Icon = "kitchen",
          Price = 10
        },
        new RoomTemplate()
        {
          Name = "Smoking room, small",
          Width = 2,
          Height = 2,
          SmokeMaxCount = 3,
          Icon = "smoking_rooms",
          Price = 0.5
        },
        new RoomTemplate()
        {
          Name = "Smoking room, medium",
          Width = 2,
          Height = 4,
          SmokeMaxCount = 7,
          Icon = "smoking_rooms",
          Price = 1
        },
      });
    }

    public DbSet<RoomTemplate> Rooms { get; set; }
    public DbSet<Person> Persons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Floor>().HasMany(h => h.Rooms).WithOne().HasForeignKey(h => h.FloorId);
    }
  }
}
