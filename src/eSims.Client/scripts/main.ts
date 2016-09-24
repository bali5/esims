//import any global library before bootstrap or it can cause errors
import 'reflect-metadata';
import 'hammerjs'
//import 'lodash';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

document.addEventListener("DOMContentLoaded", function(event) {
  platformBrowserDynamic().bootstrapModule(AppModule);
});