import { Story } from './story';

export class Project {
  public id: number;
  public name: string;
  public startTime: string;
  public endTime: string;
  
  public stories: Story[];
  
}