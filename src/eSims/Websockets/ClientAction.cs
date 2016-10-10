using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Websockets
{
  public class ClientAction
  {
    public int Id { get; set; }
    public Action Action { get; set; }
    public string Data { get; set; }
  }
}
