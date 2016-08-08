import { Room } from './room';

export class Floor {
  public id: number;
  public level: string;

  public rooms: Room[] = [];

}