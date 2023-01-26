import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/utils/app.state';
import ProductState from '../../products.state';

export const selectProducts = (state: AppState) => state.products;

export const selectListProducts =  createSelector(
  selectProducts,
  (state: ProductState) => state.products
);
