import { Route } from '@angular/router';
import { FeatureLogin } from '@team-insights/feature-login';
import { FeatureOverview } from '@team-insights/feature-overview';
import { authGuard } from '@team-insights/feature-login';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { usersFeature } from '@team-insights/user-data-access';
import * as usersEffects from '@team-insights/user-data-access/effects';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: FeatureLogin,
  },
  {
    path: 'dashboard',
    component: FeatureOverview,
    canActivate: [authGuard],
    providers: [provideState(usersFeature), provideEffects(usersEffects)],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
