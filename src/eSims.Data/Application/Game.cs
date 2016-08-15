﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Application
{
  public class Game
  {
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Name { get; set; }

    public string DataFileName { get; set; }

    public int LevelCount { get; set; }
    public double Account { get; set; }
    public int EmployeeCount { get; set; }
    public double AvarageHappiness { get; set; }
  }
}
