using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Models
{
  public class ParentChildPosition : ParentChild
  {
    public int X { get; set; }
    public int Y { get; set; }
    public int Rotation { get; set; }
  }
}
