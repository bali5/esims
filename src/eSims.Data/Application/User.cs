using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Application
{
  public class User
  {
    [Key]
    public int Id { get; set; }

    public string UserName { get; set; }

    public List<Game> Games { get; set; }
  }
}
