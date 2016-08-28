using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Context
{
  public abstract class ESimsContext : DbContext
  {
    private string mPath = null;

    protected ESimsContext(string fileName = null)
    {
      Path = fileName;
    }

    public void EnsureSeedData()
    {
      OnEnsureSeedData();
    }

    protected abstract void OnEnsureSeedData();

    protected void ApplySeed(string name, Action action)
    {
      if (!SeedHistory.Any(a => a.Name == name))
      {
        action();

        SeedHistory.Add(new Context.SeedHistory()
        {
          Name = name,
          Date = DateTime.Now
        });

        SaveChanges();
      }
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite($"Filename=./{Path ?? this.GetType().Name.ToLower().Replace("context", "")}.sqlite");

      base.OnConfiguring(optionsBuilder);
    }

    public DbSet<SeedHistory> SeedHistory { get; set; }

    public string Path
    {
      get
      {
        return mPath;
      }

      set
      {
        mPath = value;
      }
    }
  }
}
