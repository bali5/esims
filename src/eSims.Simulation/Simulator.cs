using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using eSims.Data.Application;
using eSims.Data.Building;
using eSims.Data.HumanResources;
using eSims.Data.Repository;
using Newtonsoft.Json;

namespace eSims.Simulation
{
  public class Simulator
  {
    public int BuildingId { get; }
    public bool HasSocket { get { return mSockets.Count > 0; } }

    private List<ISimulatorCommunication> mSockets = new List<ISimulatorCommunication>();

    private IApplicationRepository mApplicationRepository;

    private BuildingRepository mBuildingRepository;
    private CommonRepository mCommonRepository;

    private Game mGame;
    private TaskCompletionSource<bool> mActionTaskSource;
    private Task<bool> mInitializeTask;
    private Task<bool> mSimulationTask;
    private CancellationTokenSource mCancellationTokenSource = new CancellationTokenSource();

    private Changes mActionChanges = new Changes();

    private object mLock = new object();

    public Simulator(int buildingId, IApplicationRepository applicationRepository)
    {
      BuildingId = buildingId;
      mApplicationRepository = applicationRepository;
      mInitializeTask = DoInitialize();
      mActionTaskSource = new TaskCompletionSource<bool>();
      mActionTaskSource.SetResult(true);
    }

    private async Task<bool> DoInitialize()
    {
      await Task.Yield();

      lock (mLock)
      {
        mGame = mApplicationRepository.GetGame(BuildingId);

        if (mGame == null) return false;

        var wBuildingDataFilePath = mGame.DataFileName;

        mBuildingRepository = new BuildingRepository(wBuildingDataFilePath);

        mCommonRepository = new CommonRepository();

        return true;
      }
    }

    private async Task<bool> DoSimulation()
    {
      if (!await mInitializeTask)
      {
        return false;
      }

      while (!mCancellationTokenSource.Token.IsCancellationRequested)
      {
        lock (mLock)
        {
          var wNow = DateTime.UtcNow;
          var wStats = mBuildingRepository.GetStats();
          var wElapsed = wNow.Subtract(wStats.StartTime).TotalMilliseconds * wStats.Speed;
          wStats.StartTime = wNow;
          wStats.SimulationTime = wStats.SimulationTime.AddMilliseconds(wElapsed);
          wStats.PlayTime += wElapsed;

          DoSimulation(wStats, wElapsed);

          mBuildingRepository.SaveChanges();
        }

        await Task.Delay(100);
      }

      return true;
    }

    private void DoSimulation(BuildingStats stats, double elapsed)
    {
      var wChanges = mActionChanges;
      mActionChanges = new Changes();

      var wPersons = mBuildingRepository.GetPersons(PersonState.Hired);

      // Person

      // Project

      wChanges.Stats = stats;
      SendMessage(wChanges);
    }

    public void SendMessage(object data)
    {
      lock (mSockets)
      {
        foreach (var wSocket in mSockets)
        {
          SendMessage(wSocket, data);
        }
      }
    }

    public void SendMessage(ISimulatorCommunication socket, object data)
    {
      socket.Send(data);
    }

    public void AddSocket(ISimulatorCommunication communication)
    {
      lock (mSockets)
      {
        mSockets.Add(communication);
        if (mSockets.Count == 1)
        {
          mSimulationTask = DoSimulation();
        }
      }
    }

    public void RemoveSocket(ISimulatorCommunication communication)
    {
      lock (mSockets)
      {
        mSockets.Remove(communication);
        if (mSockets.Count == 0)
        {
          mCancellationTokenSource.Cancel();
        }
      }
    }

    private ActionAnswer AccountAction(Action action, string subject, double value)
    {
      lock (mLock)
      {
        if (mBuildingRepository.AddAccount(subject, value))
        {
          action();
          return new ActionAnswer(true);
        }
        else
        {
          return new ActionAnswer(false, "Not enough funds.");
        }
      }
    }

    private ActionAnswer GetAction(Func<object> func)
    {
      lock (mLock)
      {
        return new ActionAnswer(true, JsonConvert.SerializeObject(func()));
      }
    }

    private ActionAnswer SimpleAction(Action action)
    {
      lock (mLock)
      {
        action();
        return new ActionAnswer(true);
      }
    }

    public ActionAnswer GetGame()
    {
      return GetAction(() => mGame);
    }

    public ActionAnswer AddFloor()
    {
      return AccountAction(() =>
      {
        var wId = mBuildingRepository.AddFloor();
        mActionChanges.Floors.Add(mBuildingRepository.GetFloor(wId));
      }, "Add floor", -10);
    }

    public ActionAnswer AddRoom(int levelId, int roomTemplateId, int x, int y, int rotation)
    {
      var wTemplate = mCommonRepository.GetRoomTemplate(roomTemplateId);
      return AccountAction(() =>
      {
        var wId = mBuildingRepository.AddRoom(levelId, wTemplate, x, y, rotation);
        mActionChanges.AddedRooms.Add(mBuildingRepository.GetRoom(wId));
      }, $"Add room: {wTemplate.Name}", -wTemplate.Price);
    }

    public ActionAnswer RemovePersonWorkplace(int id)
    {
      return SimpleAction(() => {
        mBuildingRepository.GetPerson(id).RoomId = null;
        mBuildingRepository.SaveChanges();
      });
    }

    public ActionAnswer RemovePersonProject(int id)
    {
      return SimpleAction(() => {
        mBuildingRepository.GetPerson(id).ProjectId = null;
        mBuildingRepository.SaveChanges();
      });
    }

    public ActionAnswer RemovePersonTeam(int id)
    {
      return SimpleAction(() => {
        mBuildingRepository.GetPerson(id).TeamId = null;
        mBuildingRepository.SaveChanges();
      });
    }

    public ActionAnswer SpeedPlus()
    {
      return SimpleAction(() => mBuildingRepository.SpeedPlus());
    }

    public ActionAnswer GetProjects()
    {
      return GetAction(() => mBuildingRepository.GetProjects());
    }

    public ActionAnswer AcceptProject(int id)
    {
      return SimpleAction(() =>
      {
        var wProject = mBuildingRepository.AcceptProject(id);
        mActionChanges.UpdatedProjects.Add(wProject);
      });
    }

    public ActionAnswer RejectProject(int id)
    {
      return SimpleAction(() =>
      {
        mBuildingRepository.RejectProject(id);
        mActionChanges.RemovedProjects.Add(id);
      });
    }

    public ActionAnswer SpeedMinus()
    {
      return SimpleAction(() => mBuildingRepository.SpeedMinus());
    }

    public ActionAnswer RemoveRoom(int id)
    {
      return SimpleAction(() =>
      {
        mBuildingRepository.RemoveRoom(id);
        mActionChanges.RemovedRooms.Add(id);
      });
    }

    public ActionAnswer ChangePersonTeam(int personId, int id)
    {
      return SimpleAction(() => {
        var wPerson = mBuildingRepository.GetPerson(personId);
        wPerson.TeamId = id;
        mActionChanges.Persons.Add(wPerson);
        mBuildingRepository.SaveChanges();
      });
    }

    public ActionAnswer ChangePersonWorkplace(int personId, int id)
    {
      return SimpleAction(() => {
        var wPerson = mBuildingRepository.GetPerson(personId);
        wPerson.RoomId = id;
        mActionChanges.Persons.Add(wPerson);
        mBuildingRepository.SaveChanges();
      });
    }

    public ActionAnswer ChangePersonProject(int personId, int id)
    {
      return SimpleAction(() => {
        var wPerson = mBuildingRepository.GetPerson(personId);
        wPerson.ProjectId = id;
        mActionChanges.Persons.Add(wPerson);
        mBuildingRepository.SaveChanges();
      });
    }

    public ActionAnswer GetFloor(int id)
    {
      return GetAction(() => mBuildingRepository.GetFloor(id));
    }

    public ActionAnswer GetFloors()
    {
      return GetAction(() => mBuildingRepository.GetFloors());
    }

    public ActionAnswer GetPerson(int id)
    {
      return GetAction(() => mBuildingRepository.GetPerson(id));
    }

    public ActionAnswer GetPersonsAvailable()
    {
      return GetAction(() => mBuildingRepository.GetPersons(PersonState.Available));
    }

    public ActionAnswer GetPersonsFired()
    {
      return GetAction(() => mBuildingRepository.GetPersons(PersonState.Fired));
    }

    public ActionAnswer GetPersonsHired()
    {
      return GetAction(() => mBuildingRepository.GetPersons(PersonState.Hired));
    }

    public ActionAnswer GetPersonsLeft()
    {
      return GetAction(() => mBuildingRepository.GetPersons(PersonState.Left));
    }

    public ActionAnswer GetPersonsNotAvailable()
    {
      return GetAction(() => mBuildingRepository.GetPersons(PersonState.NotAvailable));
    }

    public ActionAnswer GetRoomTemplates()
    {
      return GetAction(() => mCommonRepository.GetRoomTemplates());
    }

    public ActionAnswer GetStats()
    {
      return GetAction(() => mBuildingRepository.GetStats());
    }

    public ActionAnswer FirePerson(int id)
    {
      return SimpleAction(() =>
      {
        mBuildingRepository.FirePerson(id);
        mActionChanges.Persons.Add(mBuildingRepository.GetPerson(id));
      });
    }

    public ActionAnswer HirePerson(int id)
    {
      lock (mLock)
      {
        var wStats = mBuildingRepository.GetStats();
        if (wStats.Persons >= wStats.MaxPersons)
        {
          return new ActionAnswer(false, "Max employee limit reached.");
        }
        else if (wStats.Persons >= wStats.MaxBathroom)
        {
          return new ActionAnswer(false, "Max bathroom limit reached.");
        }
        else if (wStats.Persons >= wStats.MaxKitchen)
        {
          return new ActionAnswer(false, "Max kitchen limit reached.");
        }
        else
        {
          mBuildingRepository.HirePerson(id);
          mActionChanges.Persons.Add(mBuildingRepository.GetPerson(id));
          return new ActionAnswer(true);
        }
      }
    }

  }
}
