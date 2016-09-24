import { Room } from './room';

export class Floor {
  public id: number;
  public level: string;

  public rooms: Room[] = [];

  public left: number;
  public top: number;
  public width: number;
  public height: number;

}