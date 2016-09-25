using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Building;
using eSims.Data.Context;
using eSims.Data.HumanResources;
using eSims.Tools.Mapper;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Repository
{
  public class BuildingRepository : ESimsRepository<BuildingContext>, IBuildingRepository
  {
    public BuildingRepository(string path)
      : base(path)
    {
    }

    public int AddFloor()
    {
      var wFloor = new Floor()
      {
        Level = Context.Floors.Count(),
        Width = 16,
        Height = 16
      };
      wFloor.Rooms.Add(new Room()
      {
        Left = 6,
        Top = 6,
        Width = 4,
        Height = 4,
        Name = "Elevator",
        FloorId = 1
      });

      var wEntry = Context.Floors.Add(wFloor);

      Context.SaveChanges();

      return wEntry.Entity.Id;
    }

    public int AddRoom(int levelId, RoomTemplate roomTemplate, int x, int y, int rotation)
    {
      var wRoom = new Room()
      {
        FloorId = levelId,
        Left = x,
        Top = y,
        Rotation = rotation,
        RoomTemplateId = roomTemplate.Id,
      };
      EmitMapper.Map(roomTemplate, wRoom);
      wRoom.Id = 0;

      var wRoomEntity = Context.Rooms.Add(wRoom);

      Context.SaveChanges();

      return wRoomEntity.Entity.Id;
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
      return Context.Floors.Include(i => i.Rooms).OrderByDescending(o => o.Level).ToArray();
    }

    public Person GetPerson(int id)
    {
      return Context.Persons.FirstOrDefault(f => f.Id == id);
    }

    public IEnumerable<Person> GetPersons(PersonState state)
    {
      return Context.Persons.Where(w => w.State == state).ToArray();
    }

    public Room GetRoom(int id)
    {
      return Context.Rooms.FirstOrDefault(f => f.Id == id);
    }

    public IEnumerable<Room> GetRooms()
    {
      return Context.Rooms.ToArray();
    }

    public BuildingStats GetStats()
    {
      return new BuildingStats() {
        Account = Context.AccountRows.Sum(s => s.Value)
      };
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

    public void RemoveRoom(int id)
    {
      Context.Rooms.Remove(Context.Rooms.FirstOrDefault(f => f.Id == id));
      Context.SaveChanges();
    }

    public void SaveChanges()
    {
      Context.SaveChanges();
    }

  }
}
