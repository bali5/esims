using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Websockets
{
  public enum Action
  {
    AddFloor,
    AddRoom,
    ChangePersonWorkplace,
    ChangePersonTeam,
    FirePerson,
    GetGame,
    GetFloors,
    GetFloor,
    GetPersonsHired,
    GetPersonsNotAvailable,
    GetPersonsAvailable,
    GetPersonsFired,
    GetPersonsLeft,
    GetPersons,
    GetPerson,
    GetRoomTemplates,
    GetStats,
    HirePerson,
    RemovePersonWorkplace,
    RemovePersonTeam,
    RemoveRoom,
    SpeedPlus,
    SpeedMinus,
    GetProjects,
    AcceptProject,
    RejectProject,
    ChangePersonProject,
    RemovePersonProject,
  }
}
