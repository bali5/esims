import { Component } from '@angular/core';
import { BuildingService } from './building.service';
import { Action } from './action';
import { Person } from './../person/person';

import material from './../common/material';

@Component(material({
  selector: 'es-hr',
  templateUrl: 'views/building/hr.html',
  providers: [ BuildingService ]
}))
export class HumanResources {
  constructor(private buildingService: BuildingService) { }

  public availablePersons: Person[] = [
  ];
}