using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Building
{
  public class RoomTemplate
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public double Price { get; set; }

    public string Icon { get; set; }

    //Position

    public int Width { get; set; }
    public int Height { get; set; }

    //Functions

    public int WorkplaceMaxCount { get; set; }

    public int BathroomMaxCount { get; set; }

    public int SmokeMaxCount { get; set; }

    public int KitchenMaxCount { get; set; }
    
    //Extensions

    public List<RoomExtension> RoomExtensions { get; set; }

    public List<WallExtension> WallExtensions { get; set; }

    public bool IsSystemOnly { get; set; }
  }
}
