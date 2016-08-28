import { Component, ChangeDetectionStrategy, AnimationEntryMetadata, Type, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';
import { RoundPipe, MinPipe, MaxPipe, AbsPipe } from './pipes';
import { Border } from './border';

import { Canvas } from './../canvas/canvas';
import { CanvasBorder } from './../canvas/canvas.border';

export interface IComponentData {
  selector?: string;
  inputs?: string[];
  outputs?: string[];
  properties?: string[];
  events?: string[];
  host?: {
    [key: string]: string;
  };
  providers?: any[];
  exportAs?: string;
  moduleId?: string;
  queries?: {
    [key: string]: any;
  };
  viewProviders?: any[];
  changeDetection?: ChangeDetectionStrategy;
  templateUrl?: string;
  template?: string;
  styleUrls?: string[];
  styles?: string[];
  animations?: AnimationEntryMetadata[];
  directives?: Array<Type | any[]>;
  pipes?: Array<Type | any[]>;
  encapsulation?: ViewEncapsulation;
  interpolation?: [string, string];
  precompile?: Array<Type | any[]>;
};

export default function (data: IComponentData): IComponentData {
  if (!data.directives) {
    data.directives = [];
  }

  data.directives.push(NgFor);
  data.directives.push(Border);
  data.directives.push(Canvas);
  data.directives.push(CanvasBorder);

  if (!data.pipes) {
    data.pipes = [];
  }

  data.pipes.push(RoundPipe);
  data.pipes.push(MinPipe);
  data.pipes.push(MaxPipe);
  data.pipes.push(AbsPipe);
  
  return data;
}