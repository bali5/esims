using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Building
{
  public class BuildingStats
  {
    [Key]
    public int Id { get; set; }

    public double Account { get; set; }
    public double PlayTime { get; set; }
    public DateTime SimulationTime { get; set; }
    public int Speed { get; set; }
    public DateTime StartTime { get; set; }
    public int Persons { get; set; }
    public int MaxPersons { get; set; }
    public int MaxKitchen { get; set; }
    public int MaxBathroom { get; set; }
  }
}
