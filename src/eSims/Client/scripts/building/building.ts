import { Component } from '@angular/core';
import { BuildingService } from './building.service';
import { Action } from './action';

import { HumanResources } from './../person/hr'

import material from './../common/material';

@Component(material({
  selector: 'es-building',
  templateUrl: 'views/building/building.html',
  providers: [ BuildingService ],
  directives: [
    HumanResources
  ]}))
export class Building {
  constructor(private buildingService: BuildingService) { }

  public id: number;
  public name: string;

  public currentActionTemplate: string;

  public actions: Action[] = [
    new Action('Hire new employee', 'Hire a new employee from the HR pool', 'person_add', 'person', () => { this.currentActionTemplate = 'es-hr'; return true; }),
    new Action('Add a new room', 'Create new work places', 'flip_to_front', 'money', () => { this.currentActionTemplate = null; return false }),
    new Action('Build a new level', 'Make your tower higher', 'format_indent_increase', 'money', () => { this.currentActionTemplate = null; return false })
  ];
}