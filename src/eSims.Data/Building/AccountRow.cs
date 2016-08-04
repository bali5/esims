using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Building
{
  public class AccountRow
  {
    [Key]
    public int Id { get; set; }

    public string Subject { get; set; }

    public double Value { get; set; }

  }
}
