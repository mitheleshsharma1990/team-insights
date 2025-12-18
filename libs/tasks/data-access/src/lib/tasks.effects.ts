import { createEffect, Actions, ofType } from '@ngrx/effects';
import { inject } from '@angular/core/primitives/di';
import { TasksApiService } from './tasks-api.service'
import { TasksActions } from './tasks.state';
import { catchError, switchMap,map,of } from 'rxjs';

export const taskEffects = createEffect(
  (actions$ = inject(Actions),api = inject(TasksApiService)) => {
    return actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(()=>{
        return api.getTasks().pipe(
          map((tasks)=> TasksActions.loadTasksSucess({tasks}) ),
          catchError((error)=> of(TasksActions.loadTasksError({error})))
        )
      })
    )
  },
  {functional:true}
)

export const createTask = createEffect(
  (actions$ = inject(Actions), api= inject(TasksApiService))=> {
    return actions$.pipe(
      ofType(TasksActions.createTask),
      switchMap(({task})=>{
        return api.createTasks(task).pipe(
          map((task)=> TasksActions.createTaskSuccess({task})),
          catchError((error)=> of(TasksActions.createTaskError(error)))
        )
      })
    )
  },
  {functional:true}
)