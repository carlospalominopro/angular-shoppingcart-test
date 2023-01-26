import { createAction, props } from "@ngrx/store";
import Product from '../../../utils/products.interface';

export const getProducts = createAction(
  "[Products] App get products"
);

export const setProducts = createAction(
  "[Products] App set products",
  props<{ products: Product[] }>()
);

export const initCart = createAction(
  "[Cart] App init cart"
);


export const addProduct = createAction(
  "[Products] App Add product to cart",
  props<{ product: Product }>()
);

