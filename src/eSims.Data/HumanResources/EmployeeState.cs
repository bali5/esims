using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.HumanResources
{
  public enum EmployeeState
  {
    Idle,
    Working,
    OnRoute,
    OnBreak,
    AtHome,
    OnHoliday,
    OnSickLeave
  }
}
