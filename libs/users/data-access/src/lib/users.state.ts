import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  props,
  on,
} from '@ngrx/store';
import { User } from './users-api.service';

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
    }))
  ),
});
