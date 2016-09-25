using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Building
{
  public class BuildingStats
  {
    public double Account { get; set; }
    public double PlayTime { get; set; }
    public DateTime SimulationTime { get; set; }
    public int Speed { get; internal set; }
    public DateTime StartTime { get; set; }
  }
}
