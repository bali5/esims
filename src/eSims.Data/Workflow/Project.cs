using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Workflow
{
  public class Project
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public bool IsAccepted { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public List<Story> Stories { get; set; }
  }
}
