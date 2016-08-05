import { Component } from '@angular/core';
import { BuildingService } from './building.service';
import { Building } from './building';

import material from './../common/material';

@Component(material({
  selector: 'es-building',
  templateUrl: 'views/building/building.html',
  providers: [BuildingService],
  directives: [
  ]
}))
export class BuildingList {
  public buildings: Building[];

  public onSelect(buidling: Building) {
  }
}
