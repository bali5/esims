import { Component, OnInit } from '@angular/core';
import { BuildingService } from './../building/building.service';
import { Project } from './../project/project';
import { Room } from './../building/room';
import { Person } from './person';

import { DialogElement } from './../common/dialog';
import { DialogProvider, Dialog } from './../common/dialog.provider';

@Component({
  selector: 'es-person-list',
  templateUrl: 'views/person/person-list.html'
})
export class PersonList implements OnInit {
  constructor(private service: BuildingService, private dialogProvider: DialogProvider) { }

  public persons: Person[] = [];
  public rooms: Room[] = [];
  public projects: Project[] = [];

  public selectedPerson: Person;

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.service.getPersons().then(t => this.persons = t);
    this.service.getFloors().then(t => {
      this.rooms = [];
      for (let floor of t) {
        for (let room of floor.rooms) {
          if (room.workplaceMaxCount) {
            this.rooms.push(room);
          }
        }
      }
    });
    this.service.getProjects().then(t => this.projects = t);
  }

  public changeProject(person: Person, project: Project) {
    this.service.changePersonProject(person.id, project.id);
  }

  public changeRoom(person: Person, room: Room) {
    this.service.changePersonWorkplace(person.id, room.id);
  }

  public fire(person: Person) {
    this.service.firePerson(person.id);
  }

}