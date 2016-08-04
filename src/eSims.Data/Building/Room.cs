﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using eSims.Data.HumanResources;

namespace eSims.Data.Building
{
  public class Room
  {
    [Key]
    public int Id { get; set; }

    public RoomTemplate Template {get; set; }

    public bool IsWorkplace { get; set; }

    public int Count { get; set; }

    public int MaxCount { get; set; }
  }
}