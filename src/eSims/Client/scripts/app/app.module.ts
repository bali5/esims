import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { appRouterProviders } from './app.routes';

import { AppComponent } from './app.component';

import { Canvas } from './../canvas/canvas'
import { CanvasElement } from './../canvas/canvas.element'
import { CanvasBorder } from './../canvas/canvas.border'

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    Canvas,
    CanvasElement,
    CanvasBorder
  ],
  bootstrap: [AppComponent],
  providers: [HTTP_PROVIDERS, disableDeprecatedForms, provideForms, appRouterProviders]
})
export class AppModule { }