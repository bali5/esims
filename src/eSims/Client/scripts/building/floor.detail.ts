import { Component, Input } from '@angular/core';
import { Action } from './action';

import material from './../common/material';

import { Floor } from './floor';

@Component(material({
  selector: 'es-floor-detail',
  templateUrl: 'views/building/floor-detail.html',
}))
export class FloorDetail {
  @Input() floor: Floor;
}
