import { createReducer, on, Action } from '@ngrx/store';
import * as productActions from '../actions/actions';
import ProductState from '../../products.state';

const initialState: ProductState = {
  products: [],
};

const reducer = createReducer(
  initialState,
  on(productActions.getProducts, (state) => ({ ...state })),
  on(productActions.setProducts, (state, { products }) => ({
    ...state,
    products,
  })),
  on(productActions.addProduct, (state, { product }) => ({...state, product })),
  on(productActions.initCart, (state) => ({...state })),
);

export function productReducer(state: any | undefined, action: Action) {
  return reducer(state, action);
}
