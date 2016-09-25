using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Building;
using eSims.Data.HumanResources;

namespace eSims.Simulation
{
  public class Changes
  {
    public Changes()
    {
      Persons = new List<Person>();
      Rooms = new List<Room>();
      Floors = new List<Floor>();
    }

    public List<Person> Persons { get; set; }
    public List<Room> Rooms { get; set; }
    public List<Floor> Floors { get; set; }

  }
}
