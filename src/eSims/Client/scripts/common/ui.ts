import { Component, ChangeDetectionStrategy, AnimationEntryMetadata, Type, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';
import { RoundPipe } from './pipes';

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

  if (!data.pipes) {
    data.pipes = [];
  }

  data.pipes.push(RoundPipe);
  
  return data;
}