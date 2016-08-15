using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Building
{
  public class ExtensionTemplate
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public double Price { get; set; }

    public ExtensionType Type { get; set; }
  }
}
