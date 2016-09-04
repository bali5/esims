import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { BuildingConfig } from './building.config'
import { BuildingService } from './building.service';
import { RoomService } from './room.service';
import { PersonList } from './../person/person.list';
import { PersonService } from './../person/person.service';
import { Floor } from './floor';
import { FloorThumb } from './floor.thumb';
import { FloorDetail } from './floor.detail';
import { FloorCanvasElement } from './floor.canvas.element';
import { BackgroundCanvasElement } from './background';
import { RoomDetail } from './room.detail';
import { RoomTemplate } from './room.template';
import { RoomTemplateList } from './room.template.list';
import { Action } from './action';

import { HumanResources } from './../person/hr'

import { DialogElement } from './../common/dialog';
import { DialogProvider, Dialog } from './../common/dialog.provider';

import material from './../common/material';

@Component(material({
  selector: 'es-building',
  templateUrl: 'views/building/building.html',
  providers: [
    BuildingService,
    RoomService,
    PersonService,
    BuildingConfig,
    DialogProvider
  ],
  directives: [
    HumanResources,
    FloorThumb,
    FloorDetail,
    FloorCanvasElement,
    RoomDetail,
    RoomTemplateList,
    BackgroundCanvasElement,
    DialogElement
  ]
}))
export class Building implements OnInit {
  constructor(private route: ActivatedRoute, private buildingService: BuildingService, private roomService: RoomService, private personService: PersonService, private buildingConfig: BuildingConfig, private dialogProvider: DialogProvider) { }

  @ViewChild('floorDetail') floorDetail: FloorDetail;

  public id: number;
  public name: string;

  public currentActionTemplate: string;

  public actions: Action[] = [
    new Action('Hire new employee', 'Hire a new employee from the HR pool', 'person_add', 'person', () => { this.currentActionTemplate = 'es-hr'; return true; }),
    new Action('Employee list', 'Show hired employees', 'people', 'person', () => {
      let dialog = new Dialog();
      dialog.header = 'Employee list';
      dialog.content = PersonList;
      dialog.isFullScreen = true;
      dialog.canCancel = true;
      this.dialogProvider.show(dialog);
      return false;
    }),

    new Action('Add a new room', 'Create new work places', 'flip_to_front', 'money', () => { this.currentActionTemplate = 'es-room-template-list'; return true; }),
    new Action('Build a new level', 'Make your tower higher', 'format_indent_increase', 'money', () => { this.addFloor(); this.currentActionTemplate = null; return false; })
  ];

  public floors: Floor[] = [];

  public selectedFloor: Floor;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      BuildingService.buildingId = this.id;
      RoomService.buildingId = this.id;
      PersonService.buildingId = this.id;
      this.buildingService.getFloors().then(t => {
        this.floors = t;
        this.selectedFloor = this.floors[0];
      });
    });
  }

  addFloor() {
    this.buildingService.addFloor().then(t => this.floors.splice(0, 0, t));
  }

  onBuildRoom(room: RoomTemplate) {
    this.floorDetail.startBuildingRoom(room);
  }

}