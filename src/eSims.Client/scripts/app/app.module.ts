import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {MdButtonToggleModule} from '@angular2-material/button-toggle/button-toggle';
import {MdButtonModule} from '@angular2-material/button/button';
import {MdCheckboxModule} from '@angular2-material/checkbox/checkbox';
import {MdRadioModule} from '@angular2-material/radio/radio';
import {MdSlideToggleModule} from '@angular2-material/slide-toggle/slide-toggle';
import {MdSliderModule} from '@angular2-material/slider/slider';
import {MdSidenavModule} from '@angular2-material/sidenav/sidenav';
import {MdListModule} from '@angular2-material/list/list';
import {MdGridListModule} from '@angular2-material/grid-list/grid-list';
import {MdCardModule} from '@angular2-material/card/card';
import {MdIconModule,MdIconRegistry} from '@angular2-material/icon/icon';
import {MdProgressCircleModule} from '@angular2-material/progress-circle/progress-circle';
import {MdProgressBarModule} from '@angular2-material/progress-bar/progress-bar';
import {MdInputModule} from '@angular2-material/input/input';
import {MdTabsModule} from '@angular2-material/tabs/tabs';
import {MdToolbarModule} from '@angular2-material/toolbar/toolbar';
import {MdTooltipModule} from '@angular2-material/tooltip/tooltip';
import {MdRippleModule} from '@angular2-material/core/ripple/ripple';
import {PortalModule} from '@angular2-material/core/portal/portal-directives';
import {OverlayModule} from '@angular2-material/core/overlay/overlay-directives';
import {MdMenuModule} from '@angular2-material/menu/menu';
import {RtlModule} from '@angular2-material/core/rtl/dir';

import { AppComponent } from './app.component';

import { Canvas } from './../canvas/canvas'
import { CanvasElement } from './../canvas/canvas.element'
import { CanvasBorder } from './../canvas/canvas.border'

import { DialogTextElement } from './../common/dialog'

import { BuildingConfig } from './../building/building.config'
import { BuildingService } from './../building/building.service';
import { Building } from './../building/building';
import { PersonList } from './../person/person.list';
import { Floor } from './../building/floor';
import { FloorThumb } from './../building/floor.thumb';
import { FloorDetail } from './../building/floor.detail';
import { FloorCanvasElement } from './../building/floor.canvas.element';
import { BackgroundCanvasElement } from './../building/background';
import { RoomDetail } from './../building/room.detail';
import { RoomTemplate } from './../building/room.template';
import { RoomTemplateList } from './../building/room.template.list';
import { Action } from './../building/action';

import { GameList } from './../building/game.list'

import { HumanResources } from './../person/hr'

import { ScrollPanel } from './../common/scroll.panel'

import { DialogElement } from './../common/dialog';
import { DialogProvider, Dialog } from './../common/dialog.provider';

/* Pipes */
import { RoundPipe, AbsPipe, MaxPipe, MinPipe } from './../common/pipes';

/* Routing */
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // material2
    MdButtonToggleModule,
    MdButtonModule,
    MdCheckboxModule,
    MdRadioModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSidenavModule,
    MdListModule,
    MdGridListModule,
    MdCardModule,
    MdIconModule,
    MdProgressCircleModule,
    MdProgressBarModule,
    MdInputModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdRippleModule,
    PortalModule,
    OverlayModule,
    MdMenuModule,
    RtlModule,
    // routing
    routing
  ],
  declarations: [
    AppComponent,
    Canvas,
    CanvasElement,
    CanvasBorder,
    HumanResources,
    FloorThumb,
    FloorDetail,
    FloorCanvasElement,
    RoomDetail,
    RoomTemplateList,
    BackgroundCanvasElement,
    DialogElement,
    DialogTextElement,
    PersonList,
    GameList,
    Building,
    // Pipes
    RoundPipe,
    AbsPipe, 
    MaxPipe, 
    MinPipe,
    // Common
    ScrollPanel
  ],
  bootstrap: [AppComponent],
  providers: [
    BuildingService,
    BuildingConfig,
    DialogProvider,
    MdIconRegistry
  ],
  entryComponents: [
    DialogTextElement,
    PersonList
  ]
})
export class AppModule { }