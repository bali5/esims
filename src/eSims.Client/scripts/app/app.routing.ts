import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameList }    from './../building/game.list';
import { Building }  from './../building/building';

const appRoutes: Routes = [
  { path: '', component: GameList },
  { path: 'buildings', component: GameList },
  { path: 'building/:id', component: Building }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);