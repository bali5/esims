///<reference path="../../../typings/globals/hammerjs/index.d.ts"/>

import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { appRouterProviders } from './app.routes';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  appRouterProviders
])
.catch(err => console.error(err));