import { provideRouter, RouterConfig } from '@angular/router';

import { BuildingList }    from './../building/building.list';
import { Building }  from './../building/building';

const routes: RouterConfig = [
  { path: 'buildings', component: BuildingList },
  { path: 'building/:session', component: Building }
];

export const appRouterProviders = [
  provideRouter(routes)
];