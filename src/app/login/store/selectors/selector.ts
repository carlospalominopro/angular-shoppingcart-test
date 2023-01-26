import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/utils/app.state';
import UsersState from 'src/app/login/users.state';

export const selectUsersFeature = (state: AppState) => state.user;

export const selectUser =  createSelector(
  selectUsersFeature,
  (state: UsersState) => state.user
);

export const selectLoadingUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.loading
);

export const selectErrorMessage = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.message
);
