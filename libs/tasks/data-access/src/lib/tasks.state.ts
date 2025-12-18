import { Task, CreateTaskRequest } from '@team-insights/util-interfaces';
import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  props,
  on,
} from '@ngrx/store';

interface TaskState {
  tasks:Task[];
  loading:boolean;
  error: string | null;
}

const initialState:TaskState  = {
    tasks: [] as Task[],
    loading:false,
    error:null
}


export const TasksActions = createActionGroup({
  source:'Tasks',
  events:{
    'Load tasks': emptyProps(),
    'Load tasks sucess': props<{tasks : Task[]}>(),
    'Load tasks error': props<{error:any}>(),

    'Create task': props<{task: CreateTaskRequest}>(),
    'Create task success': props<{task: Task}>(),
    'Create task error': props<{error: any}>(),
  },
})

export const tasksFeature = createFeature({
  name:'tasks',
  reducer: createReducer(
    initialState,
    on(TasksActions.loadTasks,(state)=>({
      ...state,
      loading:true,
      error:null
    })),
    on(TasksActions.loadTasksSucess,(state,{tasks})=>({
      ...state,
      tasks,
      loading:false,
      error:null
    })),
    on(TasksActions.loadTasksError,(state,{error})=>({
      ...state,
      loading:false,
      error
    })),
    on(TasksActions.createTask,(state)=>({
      ...state,
      loading:true,
      error:null
    })),
    on(TasksActions.createTaskSuccess,(state,{task})=>({
      ...state,
      loading:false,
      tasks:[...state.tasks,task]
    })),
    on(TasksActions.createTaskError,(state,{error})=>({
      ...state,
      loading:false,
      error:error
    }))
  )
})