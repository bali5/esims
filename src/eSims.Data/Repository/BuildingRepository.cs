using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Context;
using eSims.Data.HumanResources;

namespace eSims.Data.Repository
{
  public class BuildingRepository : IBuildingRepository
  {
    private BuildingContext mContext;

    public BuildingRepository(string path)
    {
      mContext = new BuildingContext(path);
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

      var wTeam = mContext.Teams.FirstOrDefault(f => f.Id == teamId);

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
        var wOldRoom = mContext.Rooms.FirstOrDefault(f => f.Id == wPerson.RoomId.Value);

        wOldRoom.Count--;
      }

      wTeam.Count++;
      wPerson.TeamId = teamId;

      mContext.SaveChanges();
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

      var wRoom = mContext.Rooms.FirstOrDefault(f => f.Id == workplaceId);

      if (wRoom == null)
      {
        throw new RepositoryException("Room is not available.");
      }

      if (wRoom.IsWorkplace)
      {
        throw new RepositoryException("Room is not a workplace.");
      }

      if (wRoom.Count >= wRoom.MaxCount)
      {
        throw new RepositoryException("Room is already full.");
      }

      if (wPerson.RoomId.HasValue)
      {
        var wOldRoom = mContext.Rooms.FirstOrDefault(f => f.Id == wPerson.RoomId.Value);

        wOldRoom.Count--;
      }

      wRoom.Count++;
      wPerson.RoomId = workplaceId;

      mContext.SaveChanges();
    }

    public void FirePerson(int id)
    {
      var wPerson = GetPerson(id);

      if (wPerson == null || wPerson.State != PersonState.Hired)
      {
        throw new RepositoryException("Person is not an employee.");
      }

      wPerson.State = PersonState.Fired;
    }

    public Person GetPerson(int id)
    {
      return mContext.Persons.FirstOrDefault(f => f.Id == id);
    }

    public IEnumerable<Person> GetPersons(PersonState state)
    {
      return mContext.Persons.Where(w => w.State == state).ToArray();
    }

    public void HirePerson(int id)
    {
      var wPerson = GetPerson(id);

      if (wPerson == null || wPerson.State == PersonState.Available)
      {
        throw new RepositoryException("Person can't be an employee.");
      }

      wPerson.State = PersonState.Hired;
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

      var wTeam = mContext.Teams.FirstOrDefault(f => f.Id == teamId);

      if (wTeam == null)
      {
        throw new RepositoryException("Team is not available.");
      }

      wTeam.Count--;
      wPerson.TeamId = null;

      mContext.SaveChanges();
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

      var wRoom = mContext.Rooms.FirstOrDefault(f => f.Id == workplaceId);

      if (wRoom == null)
      {
        throw new RepositoryException("Room is not available.");
      }

      wRoom.Count--;
      wPerson.RoomId = null;

      mContext.SaveChanges();
    }

  }
}
