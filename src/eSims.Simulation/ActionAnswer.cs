using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Simulation
{
  public class ActionAnswer
  {
    public bool IsSuccessful { get; set; }
    public string Message { get; set; }

    public ActionAnswer(bool isSuccessful = false, string message = null)
    {
      IsSuccessful = isSuccessful;
      Message = message;
    }

  }
}
