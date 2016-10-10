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
      Floors = new List<Floor>();

      AddedRooms = new List<Room>();
      UpdatedRooms = new List<Room>();
      RemovedRooms = new List<int>();
    }

    public BuildingStats Stats { get; set; }

    public List<Person> Persons { get; set; }
    public List<Floor> Floors { get; set; }

    public List<Room> AddedRooms { get; set; }
    public List<Room> UpdatedRooms { get; set; }
    public List<int> RemovedRooms { get; set; }

    public bool Any()
    {
      return
        Persons.Count > 0
        || Floors.Count > 0
        || AddedRooms.Count > 0 || UpdatedRooms.Count > 0 || RemovedRooms.Count > 0
        ;
    }

  }
}
