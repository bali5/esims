import { Component, Input } from '@angular/core';
import { Action } from './action';

import material from './../common/material';

import { Floor } from './floor';

@Component(material({
  selector: 'es-floor-thumb',
  templateUrl: 'views/building/floor-thumb.html',
}))
export class FloorThumb {
  @Input() floor: Floor;
}
