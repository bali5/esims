using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data;
using eSims.Data.HumanResources;
using eSims.Data.Repository;
using Microsoft.AspNetCore.Mvc;

namespace eSims.Controllers
{
  [Route("api/[controller]")]
  public class PersonController : ESimsController
  {
    public PersonController(IApplicationRepository applicationContext) : base(applicationContext)
    {
    }

    [HttpGet]
    public IEnumerable<Person> Get()
    {
      return BuildingRepository.GetPersons(PersonState.Hired);
    }

    [HttpGet("/hr")]
    public IEnumerable<Person> GetHumanResources()
    {
      return BuildingRepository.GetPersons(PersonState.Available);
    }

    [HttpGet("{id}")]
    public Person Get(int id)
    {
      return BuildingRepository.GetPerson(id);
    }

    [HttpPost("{id}")]
    public void Post(int id)
    {
      BuildingRepository.HirePerson(id);
    }

    [HttpPut("{id}/workplace/{workplaceId}")]
    public void PutWorkplace(int id, int workplaceId)
    {
      BuildingRepository.ChangePersonWorkplace(id, workplaceId);
    }

    [HttpPut("{id}/team/{teamId}")]
    public void PutTeam(int id, int teamId)
    {
      BuildingRepository.ChangePersonTeam(id, teamId);
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      BuildingRepository.FirePerson(id);
    }

    [HttpDelete("{id}/workplace/{workplaceId}")]
    public void DeleteWorkplace(int id, int workplaceId)
    {
      BuildingRepository.RemovePersonWorkplace(id, workplaceId);
    }

    [HttpDelete("{id}/team/{teamId}")]
    public void DeleteTeam(int id, int teamId)
    {
      BuildingRepository.RemovePersonTeam(id, teamId);
    }

  }
}
