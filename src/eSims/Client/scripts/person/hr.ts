import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';
import { Person } from './person';

import material from './../common/material';

@Component(material({
  selector: 'es-hr',
  templateUrl: 'views/person/hr.html',
  providers: [PersonService ]
}))
export class HumanResources implements OnInit {
  constructor(private service: PersonService) { }

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