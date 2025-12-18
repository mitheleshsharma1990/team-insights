import { Route } from '@angular/router';
import { FeatureLogin } from '@team-insights/feature-login';
import { FeatureOverview } from '@team-insights/feature-overview';
import { authGuard } from '@team-insights/feature-login';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { usersFeature } from '@team-insights/user-data-access';
import * as effects from '@team-insights/user-data-access/effects';
import { tasksFeature } from '@team-insights/tasks-data-access';
import * as taskEffects from '@team-insights/tasks-data-access/effects';
export const appRoutes: Route[] = [
  {
    path: 'login',
    component: FeatureLogin,
  },
  {
    path: 'dashboard',
    component: FeatureOverview,
    canActivate: [authGuard],
    providers: [
      provideState(usersFeature),
      provideEffects(effects),
      provideState(tasksFeature),
      provideEffects(taskEffects),
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
