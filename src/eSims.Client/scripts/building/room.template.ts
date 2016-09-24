import { RoomExtension } from './room.extension';
import { WallExtension } from './wall.extension';

export class RoomTemplate {
  public id: number;
  public name: string;

  public roomTemplateId: number;

  public price: number;

  public icon: string;

   //Position

  public width: number;
  public height: number;

  //Functions

  public workplaceMaxCount: number;

  public bathroomMaxCount: number;

  public smokeMaxCount: number;

  public kitchenMaxCount: number;

  //Extensions

  public roomExtensions: RoomExtension[];

  public wallExtensions: WallExtension[];

}