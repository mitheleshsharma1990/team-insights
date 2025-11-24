import { inject } from '@angular/core/primitives/di';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { UsersActions } from './users.state';

export const usersEffects = createEffect(
  (actions$ = inject(Actions), usersApiService = inject(UsersApiService)) => {
    return actions$.pipe(
      ofType(UsersActions.enterDashboard),
      switchMap(() =>
        usersApiService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
