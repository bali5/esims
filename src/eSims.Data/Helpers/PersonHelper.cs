using eSims.Data.HumanResources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eSims.Data.Helpers
{
  public static class PersonHelper
  {

    public static Person GetRandomPerson(double? power = null)
    {
      if (!power.HasValue)
      {
        //Default power
        power = 80 + Rng.Random.NextDouble() * 40;
      }

      var wOriginalPower = power.Value;
      var wRemainingPower = wOriginalPower;

      var wPerson = new Person()
      {
        Name = GetRandomName(),
        State = PersonState.Available,
        Happiness = 100d,
        Annoyance = 0d
      };

      //Assign abilities
      var wCurrentPower = wRemainingPower * Rng.Random.NextDouble();
      wPerson.Efficiency = wCurrentPower;
      wRemainingPower -= wCurrentPower;

      wCurrentPower = wRemainingPower * Rng.Random.NextDouble();
      wPerson.Investigation = wCurrentPower;
      wRemainingPower -= wCurrentPower;

      wCurrentPower = wRemainingPower * Rng.Random.NextDouble();
      wPerson.Administration = wCurrentPower;
      wRemainingPower -= wCurrentPower;

      wPerson.Creativity = wRemainingPower;

      //Assign attributes
      wRemainingPower = wOriginalPower;

      wCurrentPower = wRemainingPower * Rng.Random.NextDouble();
      wPerson.Vitality = wCurrentPower;
      wRemainingPower -= wCurrentPower;

      wCurrentPower = wRemainingPower * Rng.Random.NextDouble();
      wPerson.Charisma = wCurrentPower;
      wRemainingPower -= wCurrentPower;

      wPerson.Empathy = wRemainingPower;

      //Perks

      var wChanceModifier = 1d;

      if (Rng.GetChance(0.1 * wChanceModifier))
      {
        wChanceModifier *= 0.9;
        wPerson.Perks.Add(new PersonPerk() { Perk = Rng.GetChance(0.3) ? Perk.Chimney : Perk.Smoker });
      }
      if (Rng.GetChance(0.1 * wChanceModifier))
      {
        wChanceModifier *= 0.9;
        wPerson.Perks.Add(new PersonPerk() { Perk = Perk.TeamPlayer });
      }
      if (Rng.GetChance(0.1 * wChanceModifier))
      {
        wChanceModifier *= 0.9;
        wPerson.Perks.Add(new PersonPerk() { Perk = Perk.PartyPeople });
      }
      else if (Rng.GetChance(0.1 * wChanceModifier))
      {
        wChanceModifier *= 0.9;
        wPerson.Perks.Add(new PersonPerk() { Perk = Perk.PartyPooper });
      }
      if (Rng.GetChance(0.1 * wChanceModifier))
      {
        wChanceModifier *= 0.9;
        wPerson.Perks.Add(new PersonPerk() { Perk = Perk.LoneWolf });
      }
      if (Rng.GetChance(0.1 * wChanceModifier))
      {
        wChanceModifier *= 0.9;
        wPerson.Perks.Add(new PersonPerk() { Perk = Perk.Leader });
      }

      wPerson.Pay = (wOriginalPower / 100 * 0.1) * (0.9 + Rng.Random.NextDouble() * 0.2);

      return wPerson;
    }

    public static string GetRandomName()
    {
      return $"{GetRandomFirstName()} {GetRandomFamilyName()}";
    }

    private static readonly string[] mFamilyNames = {
      "SMITH",
      "JOHNSON",
      "WILLIAMS",
      "BROWN",
      "JONES",
      "MILLER",
      "DAVIS",
      "GARCIA",
      "RODRIGUEZ",
      "WILSON",
      "MARTINEZ",
      "ANDERSON",
      "TAYLOR",
      "THOMAS",
      "HERNANDEZ",
      "MOORE",
      "MARTIN",
      "JACKSON",
      "THOMPSON",
      "WHITE"
    };

    public static string GetRandomFamilyName()
    {
      return mFamilyNames[Rng.Random.Next(mFamilyNames.Length)];
    }

    private static readonly string[] mFirstNames = {
      "Delila",
      "Hee",
      "Tarah",
      "Numbers",
      "Wilhemina",
      "Gale",
      "Alexis",
      "Erin",
      "Kirk",
      "Jodee",
      "Ned",
      "Carlena",
      "Maybell",
      "Zina",
      "Criselda",
      "Phil",
      "Penney",
      "Stacie",
      "Paola",
      "Kelley"
    };

    public static string GetRandomFirstName()
    {
      return mFirstNames[Rng.Random.Next(mFirstNames.Length)];
    }

  }
}
