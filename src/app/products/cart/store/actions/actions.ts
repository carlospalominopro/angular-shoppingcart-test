import { createAction, props } from "@ngrx/store";
import Cart from 'src/app/utils/cart.interface';

export const getCart = createAction(
  "[Cart] App get cart localstorage products"
);

export const getDataCart = createAction(
  "[Cart] App set data cart",
  props<{ cart: Cart[] }>()
);

export const addProduct = createAction(
  "[Cart] App add product to cart",
  props<{ cart: Cart }>()
);

export const deleteProduct = createAction(
  "[Cart] App delete product to cart",
  props<{ productId: number }>()
);

export const modifyQuantity = createAction(
  "[Cart] App modify quantity",
  props<{ 
    value: boolean,
    productId : number
  }>()
);

export const clearCart = createAction(
  "[Cart] App clear cart"
);
