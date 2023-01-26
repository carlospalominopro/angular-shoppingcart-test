import { createReducer, on, Action } from "@ngrx/store";
import UsersState from "src/app/login/users.state";
import * as userActions from "../actions/actions";

const initialState: UsersState = {
  loading : false,
  message : ''
};


const reducer = createReducer(
  initialState,
  on(userActions.getUser, (state) => ({ ...state, loading : true })),
  on(userActions.getAuth, (state, {user}) => ({ ...state, user, loading : false })),
  on(userActions.errorHand, (state, {message}) => ({ ...state, loading : false, message : message })),

);

export function userReducer(state: any | undefined, action: Action) {
  return reducer(state, action);
}
