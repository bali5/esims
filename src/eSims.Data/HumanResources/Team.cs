using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.HumanResources
{
  public class Team
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public int Count { get; set; }

    public int MaxCount { get; set; }

  }
}
