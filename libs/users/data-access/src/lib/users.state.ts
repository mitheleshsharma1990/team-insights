import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  props,
  on,
} from '@ngrx/store';
import { User, CreateUserRequest } from '@team-insights/util-interfaces';

interface UserState {
  users: User[];
  loading: boolean;
  error: String | null;
}

const initialState: UserState = {
  users: [] as User[],
  loading: false,
  error: null,
};

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Enter dashboard': emptyProps(),
    'Load users success': props<{ users: User[] }>(),
    'Load users failure': props<{ error: any }>(),

    'Create User': props<{ user: CreateUserRequest }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Failure': props<{ error: any }>(),
  },
});

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(UsersActions.enterDashboard, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false,
      error: null,
    })),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(UsersActions.createUser, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(UsersActions.createUserSuccess, (state, { user }) => ({
      ...state,
      loading: false,
      users: [...state.users, user],
    })),
    on(UsersActions.createUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});
