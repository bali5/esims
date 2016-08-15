using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Building;
using eSims.Data.Context;
using eSims.Data.HumanResources;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Repository
{
  public class BuildingRepository : ESimsRepository<BuildingContext>, IBuildingRepository
  {
    public BuildingRepository(string path)
    {
    }

    public void ChangePersonTeam(int id, int teamId)
    {
      var wPerson = GetPerson(id);

      if (wPerson == null || wPerson.State != PersonState.Hired)
      {
        throw new RepositoryException("Person is not an employee.");
      }

      if (wPerson.TeamId == teamId)
      {
        return;
      }

      var wTeam = Context.Teams.FirstOrDefault(f => f.Id == teamId);

      if (wTeam == null)
      {
        throw new RepositoryException("Team is not available.");
      }

      if (wTeam.Count >= wTeam.MaxCount)
      {
        throw new RepositoryException("Team is already full.");
      }

      if (wPerson.RoomId.HasValue)
      {
        var wOldRoom = Context.Rooms.FirstOrDefault(f => f.Id == wPerson.RoomId.Value);

        wOldRoom.WorkplaceCount--;
      }

      wTeam.Count++;
      wPerson.TeamId = teamId;

      Context.SaveChanges();
    }

    public void ChangePersonWorkplace(int id, int workplaceId)
    {
      var wPerson = GetPerson(id);

      if (wPerson == null || wPerson.State != PersonState.Hired)
      {
        throw new RepositoryException("Person is not an employee.");
      }

      if (wPerson.RoomId == workplaceId)
      {
        return;
      }

      var wRoom = Context.Rooms.FirstOrDefault(f => f.Id == workplaceId);

      if (wRoom == null)
      {
        throw new RepositoryException("Room is not available.");
      }

      if (wRoom.WorkplaceMaxCount > 0)
      {
        throw new RepositoryException("Room is not a workplace.");
      }

      if (wRoom.WorkplaceCount >= wRoom.WorkplaceMaxCount)
      {
        throw new RepositoryException("Room is already full.");
      }

      if (wPerson.RoomId.HasValue)
      {
        var wOldRoom = Context.Rooms.FirstOrDefault(f => f.Id == wPerson.RoomId.Value);

        wOldRoom.WorkplaceCount--;
      }

      wRoom.WorkplaceCount++;
      wPerson.RoomId = workplaceId;

      Context.SaveChanges();
    }

    public void FirePerson(int id)
    {
      var wPerson = GetPerson(id);

      if (wPerson == null || wPerson.State != PersonState.Hired)
      {
        throw new RepositoryException("Person is not an employee.");
      }

      wPerson.State = PersonState.Fired;

      Context.SaveChanges();
    }

    public Floor GetFloor(int id)
    {
      return Context.Floors.FirstOrDefault(f => f.Id == id);
    }

    public IEnumerable<Floor> GetFloors()
    {
      return Context.Floors.OrderByDescending(o => o.Level).ToArray();
    }

    public Person GetPerson(int id)
    {
      return Context.Persons.FirstOrDefault(f => f.Id == id);
    }

    public IEnumerable<Person> GetPersons(PersonState state)
    {
      return Context.Persons.Where(w => w.State == state).ToArray();
    }

    public void HirePerson(int id)
    {
      var wPerson = GetPerson(id);

      if (wPerson == null || wPerson.State != PersonState.Available)
      {
        throw new RepositoryException("Person can't be an employee.");
      }

      wPerson.State = PersonState.Hired;

      Context.SaveChanges();
    }

    public void RemovePersonTeam(int id, int teamId)
    {
      var wPerson = GetPerson(id);

      if (wPerson == null || wPerson.State != PersonState.Hired)
      {
        throw new RepositoryException("Person is not an employee.");
      }

      if (wPerson.TeamId != teamId)
      {
        return;
      }

      var wTeam = Context.Teams.FirstOrDefault(f => f.Id == teamId);

      if (wTeam == null)
      {
        throw new RepositoryException("Team is not available.");
      }

      wTeam.Count--;
      wPerson.TeamId = null;

      Context.SaveChanges();
    }

    public void RemovePersonWorkplace(int id, int workplaceId)
    {
      var wPerson = GetPerson(id);

      if (wPerson == null || wPerson.State != PersonState.Hired)
      {
        throw new RepositoryException("Person is not an employee.");
      }

      if (wPerson.RoomId != workplaceId)
      {
        return;
      }

      var wRoom = Context.Rooms.FirstOrDefault(f => f.Id == workplaceId);

      if (wRoom == null)
      {
        throw new RepositoryException("Room is not available.");
      }

      wRoom.WorkplaceCount--;
      wPerson.RoomId = null;

      Context.SaveChanges();
    }

  }
}
