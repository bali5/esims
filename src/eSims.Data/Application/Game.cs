using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Application
{
  public class Game
  {
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Name { get; set; }

    public string SessionId { get; set; }

    public string DataFilePath { get; set; }
  }
}
