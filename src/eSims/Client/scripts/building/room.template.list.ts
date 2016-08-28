import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoomService } from './room.service';
import { RoomTemplate } from './room.template';

import material from './../common/material';

@Component(material({
  selector: 'es-room-template-list',
  templateUrl: 'views/building/room-template-list.html',
  providers: [RoomService]
}))
export class RoomTemplateList implements OnInit {
  @Output() selectRoom = new EventEmitter<RoomTemplate>();

  constructor(private service: RoomService) { }

  public roomTemplates: RoomTemplate[] = [
  ];

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.service.getRoomTemplates().then(t => this.roomTemplates = t);
  }

  build(room: RoomTemplate) {
    this.selectRoom.emit(room);
  }

}