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
          Name = "Developer room, mini",
          Width = 2,
          Height = 2,
          WorkplaceMaxCount = 2
        },
        new RoomTemplate()
        {
          Name = "Developer room, small",
          Width = 4,
          Height = 2,
          WorkplaceMaxCount = 4
        },
        new RoomTemplate()
        {
          Name = "Developer room, small",
          Width = 2,
          Height = 4,
          WorkplaceMaxCount = 4
        },
      });
    }

    public DbSet<RoomTemplate> Rooms { get; set; }
    public DbSet<Person> Persons { get; set; }

  }
}
