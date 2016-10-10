using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Simulation;

namespace eSims.Websockets
{
  public class ClientAnswer
  {
    public ClientAnswer(ClientAction action, ActionAnswer answer)
    {
      Id = action.Id;
      IsSuccessful = answer.IsSuccessful;
      Message = answer.Message;
    }

    public int Id { get; set; }
    public bool IsSuccessful { get; set; }
    public string Message { get; set; }
  }
}
