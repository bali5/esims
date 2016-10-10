using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using eSims.Data.Repository;
using eSims.Extensions;
using eSims.Models;
using eSims.Simulation;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace eSims.Websockets
{
  public class SimulatorSocket : ISimulatorCommunication
  {
    static Dictionary<int, Simulator> mSimulators = new Dictionary<int, Simulator>();

    const int cMaxMessageSize = 4096;

    CancellationTokenSource mCancellationTokenSource = new CancellationTokenSource();

    public static async Task<bool> Create(HttpContext context, IApplicationRepository applicationRepository)
    {
      int wBuildingId;
      var path = context.Request.Path.Value.TrimEnd('/');

      if (!int.TryParse(path.Substring(path.LastIndexOf('/') + 1), out wBuildingId)) return false;

      var wSocket = new SimulatorSocket(context);
      await wSocket.Accept();

      Simulator wSimulator;
      lock (mSimulators)
      {
        if (!mSimulators.TryGetValue(wBuildingId, out wSimulator))
        {
          wSimulator = new Simulator(wBuildingId, applicationRepository);
          mSimulators.Add(wBuildingId, wSimulator);
        }
        wSimulator.AddSocket(wSocket);
      }

      await wSocket.Listen(wSimulator);

      return true;
    }

    private readonly HttpContext mContext;
    private WebSocket mSocket;
    private Simulator mSimulator;

    public SimulatorSocket(HttpContext context)
    {
      mContext = context;
    }

    public async Task Accept()
    {
      mSocket = await mContext.WebSockets.AcceptWebSocketAsync();
    }

    public async Task Listen(Simulator simulator)
    {
      mSimulator = simulator;

      string wRequest = "";

      while (mSocket.State == WebSocketState.Open)
      {
        var wToken = CancellationToken.None;
        var wBuffer = new ArraySegment<Byte>(new Byte[cMaxMessageSize]);
        var wReceived = await mSocket.ReceiveAsync(wBuffer, wToken);

        switch (wReceived.MessageType)
        {
          case WebSocketMessageType.Text:
            wRequest += Encoding.UTF8.GetString(wBuffer.Array, wBuffer.Offset, wReceived.Count);
            if (wReceived.EndOfMessage)
            {
              var wAction = JsonConvert.DeserializeObject<ClientAction>(wRequest);
              wRequest = "";
              SendAnswer(wAction, DoAction(wAction));
            }
            break;
          case WebSocketMessageType.Close:
            break;
        }
      }

      lock (mSimulators)
      {
        mSimulator.RemoveSocket(this);
        if (!mSimulator.HasSocket)
        {
          mSimulators.Remove(mSimulator.BuildingId);
        }
      }
    }

    private void SendAnswer(ClientAction action, ActionAnswer answer)
    {
      Send(new ClientAnswer(action, answer));
    }

    public void Send(object data)
    {
      mSocket.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data))), WebSocketMessageType.Text, true, mCancellationTokenSource.Token);
    }

    private ActionAnswer DoAction(ClientAction action)
    {
      switch (action.Action)
      {
        case Action.AddFloor:
          return mSimulator.AddFloor();
        case Action.AddRoom:
          var wDataAddRoom = JsonConvert.DeserializeObject<ParentChildPosition>(action.Data);
          return mSimulator.AddRoom(wDataAddRoom.ParentId, wDataAddRoom.ChildId, wDataAddRoom.X, wDataAddRoom.Y, wDataAddRoom.Rotation);
        case Action.ChangePersonTeam:
          break;
        case Action.ChangePersonWorkplace:
          break;
        case Action.GetGame:
          return mSimulator.GetGame();
        case Action.GetFloor:
          return mSimulator.GetFloor(int.Parse(action.Data));
        case Action.GetFloors:
          return mSimulator.GetFloors();
        case Action.GetPerson:
          return mSimulator.GetPerson(int.Parse(action.Data));
        case Action.GetPersonsAvailable:
          return mSimulator.GetPersonsAvailable();
        case Action.GetPersonsFired:
          return mSimulator.GetPersonsFired();
        case Action.GetPersonsHired:
          return mSimulator.GetPersonsHired();
        case Action.GetPersonsLeft:
          return mSimulator.GetPersonsLeft();
        case Action.GetPersonsNotAvailable:
          return mSimulator.GetPersonsNotAvailable();
        case Action.GetRoomTemplates:
          return mSimulator.GetRoomTemplates();
        case Action.GetStats:
          return mSimulator.GetStats();
        case Action.FirePerson:
          return mSimulator.FirePerson(int.Parse(action.Data));
        case Action.HirePerson:
          return mSimulator.HirePerson(int.Parse(action.Data));
        case Action.RemovePersonTeam:
          break;
        case Action.RemovePersonWorkplace:
          break;
        case Action.RemoveRoom:
          return mSimulator.RemoveRoom(int.Parse(action.Data));
        case Action.SpeedMinus:
          return mSimulator.SpeedMinus();
        case Action.SpeedPlus:
          return mSimulator.SpeedPlus();
      }

      return null;
    }

  }
}
