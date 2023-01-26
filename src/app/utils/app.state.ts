import { ActionReducerMap } from '@ngrx/store';
import UserState from '../login/users.state';
import { userReducer } from '../login/store/reducers/reducer';
import ProductState from '../products/products.state';
import { productReducer } from '../products/store/reducers/reducers';

export interface AppState {
  user: UserState;
  products: ProductState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  user: userReducer,
  products: productReducer,
};
