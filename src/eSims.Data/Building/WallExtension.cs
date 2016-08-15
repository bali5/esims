using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Building
{
  public class WallExtension : Extension
  {
    public Direction Placement { get; set; }
  }
}
