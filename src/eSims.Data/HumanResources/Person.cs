using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace eSims.Data.HumanResources
{
  public class Person
  {
    public Person()
    {
      Perks = new List<PersonPerk>();
    }

    [Key]
    public int Id { get; set; }

    public string Name { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public PersonState State { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public EmployeeState? EmployeeState { get; set; }
    [JsonConverter(typeof(StringEnumConverter))]
    public BreakType? CurrentBreak { get; set; }

    public string Image { get; set; }

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

    public int? ProjectId { get; set; }

    public double? HireTime { get; set; }

    public double Pay { get; set; }

  }
}
