import { GroupService } from './group.service';

export class Group {
  constructor(private groupService: GroupService) { }

  public id: number;
  public name: string;
}