using System.Collections.Generic;
using eSims.Data.Building;
using eSims.Data.HumanResources;

namespace eSims.Data.Repository
{
  public interface IBuildingRepository
  {
    IEnumerable<Person> GetPersons(PersonState hired);
    Person GetPerson(int id);
    void ChangePersonWorkplace(int id, int workplaceId);
    void ChangePersonTeam(int id, int teamId);
    void RemovePersonWorkplace(int id, int workplaceId);
    void RemovePersonTeam(int id, int teamId);
    void FirePerson(int id);
    void HirePerson(int id);
    IEnumerable<Floor> GetFloors();
    Floor GetFloor(int id);
    IEnumerable<Room> GetRooms();
    int AddFloor();
    Room GetRoom(int id);
    BuildingStats GetStats();
    int AddRoom(int levelId, RoomTemplate roomTemplate, int x, int y, int rotation);
    void RemoveRoom(int id);
    bool AddAccount(string subject, double value);
  }
}