using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Application;
using eSims.Data.Repository;

namespace eSims.Simulation
{
  public class Simulator
  {
    public int BuildingId { get; }
    public bool HasSocket { get { return mSockets.Count > 0; } }

    private List<ISimulatorCommunication> mSockets = new List<ISimulatorCommunication>();

    private IApplicationRepository mApplicationRepository;
    private BuildingRepository mBuildingRepository;
    private Game mGame;

    public Simulator(int buildingId, IApplicationRepository applicationRepository)
    {
      BuildingId = buildingId;
      DoWork();
    }

    private async Task DoWork()
    {
      await Task.Yield();

      if (!Initialize()) return;

      while (true)
      {
        var wNow = DateTime.UtcNow;
        var wStats = mBuildingRepository.GetStats();
        var wElapsed = wNow.Subtract(wStats.StartTime).TotalMilliseconds * wStats.Speed;
        wStats.StartTime = wNow;
        wStats.SimulationTime = wStats.SimulationTime.AddMilliseconds(wElapsed);
        wStats.PlayTime += wElapsed;

        await DoSimulation(wStats.SimulationTime, wElapsed);  

        mBuildingRepository.SaveChanges();
        await Task.Delay(100);
      }
    }

    private async Task DoSimulation(DateTime time, double elapsed)
    {

    }

    private bool Initialize()
    {
      mGame = mApplicationRepository.GetGame(BuildingId);

      if (mGame == null) return false;

      var wBuildingDataFilePath = mGame.DataFileName;

      mBuildingRepository = new BuildingRepository(wBuildingDataFilePath);

      return true;
    }

    public void AddSocket(ISimulatorCommunication communication)
    {
      lock (mSockets)
      {
        mSockets.Add(communication);
      }
    }

    public void RemoveSocket(ISimulatorCommunication communication)
    {
      lock (mSockets)
      {
        mSockets.Remove(communication);
      }
    }


  }
}
