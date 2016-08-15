using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.HumanResources;
using Newtonsoft.Json;

namespace eSims.Data.Building
{
  public class Room : RoomTemplate
  {
    public int RoomTemplateId { get; set; }

    //Position

    public int Left { get; set; }
    public int Top { get; set; }

    public int Rotation { get; set; }

    //Functions

    public int WorkplaceCount { get; set; }

    public int BathroomCount { get; set; }

    public int SmokeCount { get; set; }

  }
}
