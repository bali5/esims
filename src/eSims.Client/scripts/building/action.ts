export class Action {
  constructor(public title: string, public description: string, public icon: string, public badgeType: string, public action: () => boolean = () => false) { }

  public badge: number = Math.floor(Math.random() * 100);
}