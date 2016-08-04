using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Building
{
  public class Floor
  {
    [Key]
    public int Id { get; set; }

    public int Level { get; set; }

    public List<Room> Rooms { get; set; }

  }
}
