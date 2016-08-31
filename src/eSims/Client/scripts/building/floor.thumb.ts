import { Component, Input, Output, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { Action } from './action';

import material from './../common/material';

import { BuildingConfig } from './building.config'

import { Floor } from './floor';
import { FloorCanvasElement } from './floor.canvas.element';

@Component(material({
  selector: 'es-floor-thumb',
  templateUrl: 'views/building/floor-thumb.html',
}))
export class FloorThumb {
  @Input() floor: Floor;

  @ViewChild('b') border: ElementRef;
  @ViewChild('floorCanvas') floorCanvas: FloorCanvasElement;

  public size: number;

  private currentAction: string;
  private currentActionParameter: any;

  constructor(private buildingConfig: BuildingConfig) { }

  ngAfterViewInit() {
    setTimeout(() => this.onResize());
  }

  onResize() {
    this.size = Math.min(this.border.nativeElement.offsetWidth, this.border.nativeElement.offsetHeight);
  }
}
