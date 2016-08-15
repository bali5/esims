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
      Context.Database.Migrate();
      Context.EnsureSeedData();
    }
  }
}
