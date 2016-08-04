using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Application;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Context
{
  public class ApplicationContext : DbContext
  {
    private string mPath = ".\app.sqlite";

    public ApplicationContext()
        : base()
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite(mPath);

      base.OnConfiguring(optionsBuilder);
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Game> Games { get; set; }

  }
}
