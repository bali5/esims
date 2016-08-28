using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data;
using eSims.Data.Building;
using eSims.Data.HumanResources;
using eSims.Data.Repository;
using eSims.Models;
using Microsoft.AspNetCore.Mvc;

namespace eSims.Controllers
{
  [Route("api/[controller]")]
  public class RoomController : ESimsController
  {
    public RoomController(IApplicationRepository applicationContext) : base(applicationContext)
    {
    }

    [HttpGet()]
    public IEnumerable<Room> Get()
    {
      return BuildingRepository.GetRooms();
    }

    [HttpGet("template")]
    public IEnumerable<RoomTemplate> GetTemplates()
    {
      return CommonRepository.GetRoomTemplates();
    }

    [HttpGet("{id:int}")]
    public Room Get(int id)
    {
      return BuildingRepository.GetRoom(id);
    }

    [HttpPost()]
    public Room Post([FromBody]ParentChildPosition ids)
    {
      var wId = BuildingRepository.AddRoom(ids.ParentId, CommonRepository.GetRoomTemplate(ids.ChildId), ids.X, ids.Y, ids.Rotation);

      return Get(wId);
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      BuildingRepository.RemoveRoom(id);
    }

  }
}
