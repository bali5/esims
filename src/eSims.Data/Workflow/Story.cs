using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace eSims.Data.Workflow
{
  public class Story
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    [JsonConverter(typeof(StringEnumConverter))]
    public StoryType Type { get; set; }

    public double Size { get; set; }
    public double Finished { get; set; }

  }
}
