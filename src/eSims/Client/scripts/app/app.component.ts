import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import material from './../common/material';
import { Building } from './../building/building';

@Component(material({
  selector: 'es-app',
  templateUrl: 'views/app/e-sims.html',
  directives: [
    NgFor,
    Building
  ]
}))
export class AppComponent { }