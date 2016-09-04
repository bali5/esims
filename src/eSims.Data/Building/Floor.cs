using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Building
{
  public class Floor
  {
    public Floor()
    {
      Rooms = new List<Room>();
    }

    [Key]
    public int Id { get; set; }

    public int Level { get; set; }

    public List<Room> Rooms { get; set; }

    public int Left { get; set; }
    public int Top { get; set; }
    public int Height { get; set; }
    public int Width { get; set; }
  }
}
