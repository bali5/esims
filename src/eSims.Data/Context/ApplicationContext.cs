using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Application;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Context
{
  public class ApplicationContext : ESimsContext
  {
    public ApplicationContext()
        : base("app")
    {
    }

    protected override void OnEnsureSeedData()
    {
      ApplySeed("AddAdmin", AddAdmin);
    }

    private void AddAdmin()
    {
      Users.Add(new User()
      {
        UserName = "admin"
      });
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Game> Games { get; set; }

  }
}
