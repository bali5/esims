using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using eSims.Data;
using eSims.Data.Application;
using eSims.Data.Repository;
using eSims.Extensions;
using eSims.Simulation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

namespace eSims.Websockets
{
  public class SimulatorSocket : ISimulatorCommunication
  {
    static Dictionary<int, Simulator> mSimulators = new Dictionary<int, Simulator>();

    const int cMaxMessageSize = 4194304;

    public static async void Create(HttpContext context, IApplicationRepository applicationRepository)
    {
      var wResult = await Task.Run<bool>(async () =>
      {
        var wHeader = context.GetHeader("esimsbuilding");
        int wBuildingId;

        if (!int.TryParse(wHeader, out wBuildingId)) return false;

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
        }
        wSimulator.AddSocket(wSocket);

        wSocket.Listen(wSimulator);

        return true;
      });
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

      while (mSocket.State == WebSocketState.Open)
      {
        var wToken = CancellationToken.None;
        var wBuffer = new ArraySegment<Byte>(new Byte[cMaxMessageSize]);
        var wReceived = await mSocket.ReceiveAsync(wBuffer, wToken);

        switch (wReceived.MessageType)
        {
          case WebSocketMessageType.Text:
            var request = Encoding.UTF8.GetString(wBuffer.Array, wBuffer.Offset, wBuffer.Count);
            break;
          case WebSocketMessageType.Close:
            break;
        }
      }

      mSimulator.RemoveSocket(this);
      lock (mSimulators)
      {
        if (!mSimulator.HasSocket)
        {
          mSimulators.Remove(mSimulator.BuildingId);
        }
      }
    }

  }
}
