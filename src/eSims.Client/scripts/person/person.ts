const enum PersonState {
  NotAvailable,
  Available,
  Hired,
  Fired,
  Left
}

const enum EmployeeState {
  Idle,
  Working,
  OnRoute,
  OnBreak,
  AtHome,
  OnHoliday,
  OnSickLeave
}

const enum BreakType {
  Wc,
  Smokeing
}

const enum Perk {
  Smoker,
  Chimney,
  PartyPeople,
  PartyPooper,
  Leader,
  TeamPlayer,
  LoneWolf
}

export class Person {
  constructor() { }

  public id: number;
  public name: string;

  public characterState: PersonState;
  public employeeState: EmployeeState;
  public currentBreak: BreakType;

  /// <summary>
  /// How good at coding stories
  /// </summary>
  public efficiency: number;
  /// <summary>
  /// How good at bug fixes
  /// </summary>
  public investigation: number;
  /// <summary>
  /// How good at documenting
  /// </summary>
  public administration: number;
  /// <summary>
  /// How good at architecting
  /// </summary>
  public creativity: number;

  /// <summary>
  /// Resiliency against sicknesses
  /// </summary>
  public vitality: number;

  /// <summary>
  /// How easily can charm others
  /// </summary>
  public charisma: number;
  /// <summary>
  /// How easily can accept others
  /// </summary>
  public empathy: number;

  /// <summary>
  /// Daily energy
  /// </summary>
  public energy: number;
  /// <summary>
  /// Overall happiness
  /// </summary>
  public happiness: number;
  /// <summary>
  /// Daily annoyance
  /// </summary>
  public annoyance: number;

  public perks: Perk[];

  public hireTime: number;

  public pay: number;

}