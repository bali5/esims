using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.HumanResources
{
  public class PersonPerk
  {
    [Key]
    public int Id { get; set; }

    public int PersonId { get; set; }
    public Perk Perk { get; set; }

  }
}
