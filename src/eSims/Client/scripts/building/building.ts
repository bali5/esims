import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { BuildingService } from './building.service';
import { Floor } from './floor';
import { FloorThumb } from './floor.thumb';
import { FloorDetail } from './floor.detail';
import { Action } from './action';

import { HumanResources } from './../person/hr'

import material from './../common/material';

@Component(material({
  selector: 'es-building',
  templateUrl: 'views/building/building.html',
  providers: [ BuildingService ],
  directives: [
    HumanResources,
    FloorThumb,
    FloorDetail
  ]}))
export class Building implements OnInit {
  constructor(private route: ActivatedRoute, private service: BuildingService) { }

  public id: number;
  public name: string;

  public currentActionTemplate: string;

  public actions: Action[] = [
    new Action('Hire new employee', 'Hire a new employee from the HR pool', 'person_add', 'person', () => { this.currentActionTemplate = 'es-hr'; return true; }),
    new Action('Add a new room', 'Create new work places', 'flip_to_front', 'money', () => { this.currentActionTemplate = null; return false }),
    new Action('Build a new level', 'Make your tower higher', 'format_indent_increase', 'money', () => { this.currentActionTemplate = null; return false })
  ];

  public floors: Floor[] = [];

  public selectedFloor: Floor;

  public floorColors: string[] = [
    '#FFFF00',
    '#FFBF00',
    '#FF8000',
    '#FF4000',
    '#FF0000',
    '#BF4000',
    '#808000',
    '#40BF00',
    '#00FF00',
    '#00BF40',
    '#008080',
    '#0040BF',
    '#0000FF',
    '#4000FF',
    '#8000FF',
    '#BF00FF',
    '#FF00FF',
    '#BF40FF',
    '#8080FF',
    '#40BFFF',
    '#00FFFF',
  ];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.service.getFloors(this.id).then(t => this.floors = t);
    });
  }

}