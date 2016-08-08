using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Building;
using eSims.Data.Repository;
using Microsoft.AspNetCore.Mvc;

namespace eSims.Controllers
{
  [Route("api/[controller]")]
  public class BuildingController : ESimsController
  {
    public BuildingController(IApplicationRepository applicationRepository) : base(applicationRepository)
    {
    }

    // GET api/values
    [HttpGet]
    public IEnumerable<Floor> Get()
    {
      return BuildingRepository.GetFloors();
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public Floor Get(int id)
    {
      return BuildingRepository.GetFloor(id);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
