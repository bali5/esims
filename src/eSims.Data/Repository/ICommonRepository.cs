﻿using eSims.Data.Building;

namespace eSims.Data.Repository
{
  public interface ICommonRepository
  {
    RoomTemplate[] GetRoomTemplates();

  }
}