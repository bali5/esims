import { RoomTemplate } from './room.template';

export class Room extends RoomTemplate {
  public roomTemplateId: number;

  public left: number;
  public top: number;
  public rotation: number;

  public workplaceCount: number;
  public bathroomCount: number;
  public smokeCount: number;
  public kitchenCount: number;

}