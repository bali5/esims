import { Component, OnInit } from '@angular/core';
import { BuildingService } from './../building/building.service';
import { Person } from './person';

@Component({
  selector: 'es-hr',
  templateUrl: 'views/person/hr.html'
})
export class HumanResources implements OnInit {
  constructor(private service: BuildingService) { }

  public availablePersons: Person[] = [
  ];

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.service.getAvailablePersons().then(t => this.availablePersons = t);
  }

  hire(person: Person) {
    this.service.hirePerson(person.id).then(t => this.updateList());
  }

}