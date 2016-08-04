using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Workflow
{
  public class Story
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public StoryType Type { get; set; }

    public double Size { get; set; }
    public double Finished { get; set; }

  }
}
