using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Helpers
{
  public static class Rng
  {
    static Rng()
    {
      Random = new Random();
    }

    public static Random Random { get; }

    public static bool GetChance(double value)
    {
      return Random.NextDouble() < value;
    }

  }
}
