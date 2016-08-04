import { Component, ChangeDetectionStrategy, AnimationEntryMetadata, Type, ViewEncapsulation } from '@angular/core';

import {MdUniqueSelectionDispatcher} from '@angular2-material/core';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import {MD_RADIO_DIRECTIVES} from '@angular2-material/radio';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

interface IComponentData {
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
  if (!data.providers) {
    data.providers = [];
  }

  data.providers.push(MdUniqueSelectionDispatcher);
  data.providers.push(MdIconRegistry);

  if (!data.directives) {
    data.directives = [];
  }

  data.directives.push(MD_SIDENAV_DIRECTIVES);
  data.directives.push(MD_TOOLBAR_DIRECTIVES);
  data.directives.push(MD_BUTTON_DIRECTIVES);
  data.directives.push(MD_CHECKBOX_DIRECTIVES);
  data.directives.push(MD_RADIO_DIRECTIVES);
  data.directives.push(MD_PROGRESS_CIRCLE_DIRECTIVES);
  data.directives.push(MD_PROGRESS_BAR_DIRECTIVES);
  data.directives.push(MD_CARD_DIRECTIVES);
  data.directives.push(MD_INPUT_DIRECTIVES);
  data.directives.push(MD_LIST_DIRECTIVES);
  data.directives.push(MD_TABS_DIRECTIVES);
  data.directives.push(MdIcon);

  return data;
}
