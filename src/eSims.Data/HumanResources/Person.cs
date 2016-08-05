using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.HumanResources
{
  public class Person
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }
    public PersonState State { get; set; }
    public EmployeeState? EmployeeState { get; set; }
    public BreakType? CurrentBreak { get; set; }

    /// <summary>
    /// How good at coding stories
    /// </summary>
    public double Efficiency { get; set; }
    /// <summary>
    /// How good at bug fixes
    /// </summary>
    public double Investigation { get; set; }
    /// <summary>
    /// How good at documenting
    /// </summary>
    public double Administration { get; set; }
    /// <summary>
    /// How good at architecting
    /// </summary>
    public double Creativity { get; set; }

    /// <summary>
    /// Resiliency against sicknesses
    /// </summary>
    public double Vitality { get; set; }

    /// <summary>
    /// How easily can charm others
    /// </summary>
    public double Charisma { get; set; }
    /// <summary>
    /// How easily can accept others
    /// </summary>
    public double Empathy { get; set; }

    /// <summary>
    /// Daily energy
    /// </summary>
    public double Energy { get; set; }
    /// <summary>
    /// Overall happiness
    /// </summary>
    public double Happiness { get; set; }
    /// <summary>
    /// Daily annoyance
    /// </summary>
    public double Annoyance { get; set; }

    public List<PersonPerk> Perks { get; set; }

    public int? RoomId { get; set; }

    public int? TeamId { get; set; }

  }
}
