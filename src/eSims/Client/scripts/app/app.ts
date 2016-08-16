///<reference path="../../../typings/globals/hammerjs/index.d.ts"/>

//import any global library before bootstrap or it can cause errors
import 'reflect-metadata';
//import 'lodash';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);