import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NgFor } from '@angular/common';

import material from './../common/material';

@Component(material({
  selector: 'es-app',
  templateUrl: 'views/app/e-sims.html',
  directives: [
    NgFor,
    ROUTER_DIRECTIVES
  ]
}))
export class AppComponent { }