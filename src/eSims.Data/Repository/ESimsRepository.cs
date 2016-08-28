using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Repository
{
  public abstract class ESimsRepository<T>
    where T : ESimsContext, new()
  {
    protected T Context { get; }

    protected ESimsRepository()
    {
      Context = new T();
      Create();
    }

    protected ESimsRepository(string path)
    {
      Context = new T();
      Context.Path = path;
      Create();
    }

    private void Create()
    {
      Context.Database.Migrate();
      Context.EnsureSeedData();
    }

  }
}
