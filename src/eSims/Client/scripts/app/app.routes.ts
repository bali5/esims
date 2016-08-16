import { provideRouter, RouterConfig } from '@angular/router';

import { GameList }    from './../building/game.list';
import { Building }  from './../building/building';

const routes: RouterConfig = [
  { path: '', component: GameList },
  { path: 'buildings', component: GameList },
  { path: 'building/:id', component: Building }
];

export const appRouterProviders = [
  provideRouter(routes)
];