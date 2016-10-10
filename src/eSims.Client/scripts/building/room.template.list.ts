﻿import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BuildingService } from './building.service';
import { RoomTemplate } from './room.template';

@Component({
  selector: 'es-room-template-list',
  templateUrl: 'views/building/room-template-list.html'
})
export class RoomTemplateList implements OnInit {
  @Output() selectRoom = new EventEmitter<RoomTemplate>();

  constructor(private service: BuildingService) { }

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