using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace eSims.Controllers
{
  [Route("api/[controller]")]
  public class GameController : Controller
  {
    private IApplicationRepository mRepository;

    public GameController(IApplicationRepository repository)
    {
      mRepository = repository;
    }

    // GET: api/values
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return mRepository.GetGames("");
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
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
