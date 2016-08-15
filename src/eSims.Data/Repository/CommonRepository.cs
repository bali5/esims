using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.Building;
using eSims.Data.Context;
using eSims.Data.HumanResources;
using Microsoft.EntityFrameworkCore;

namespace eSims.Data.Repository
{
  public class CommonRepository : ESimsRepository<CommonContext>, ICommonRepository
  {
    public CommonRepository()
    {
    }

    public RoomTemplate[] GetRoomTemplates()
    {
      return Context.Rooms.ToArray();
    }

  }
}
