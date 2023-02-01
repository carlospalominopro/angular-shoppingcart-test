import { createReducer, on, Action } from '@ngrx/store';
import * as cartActions from '../actions/actions';
import CartState from '../../cart.state';

const initialState: CartState = {
  cart: [],
};

const reducer = createReducer(
  initialState,
  on(cartActions.getCart, (state) => ({
    ...state,
  })),
  on(cartActions.getDataCart, (state, cart) => ({
    ...state,
    ...cart,
  })),
  on(cartActions.addProduct, (state, action) => {
    return {
      ...state,
      cart: [...state.cart, action.cart],
    };
  }),
  on(cartActions.deleteProduct, (state, action) => {
    return {
      ...state,
      cart: [
        ...state.cart.filter((cart) => cart.product.id === action.productId),
      ],
    };
  }),
  on(cartActions.clearCart, (state) => {
    return {
      ...state,
      cart: [],
    };
  }),
  on(cartActions.modifyQuantity, (state, { value, productId }) => {
    return {
      ...state,
      cart: [
        ...state.cart.map((cart) => {

          let newQuantity = 0 + cart.quantity;
  
          if (cart.product.id == productId) {
            if (cart.quantity > 1) {
              // ADD
              if (value) {
                newQuantity += 1;
  
                // MINUS
              } else {
                newQuantity -= 1;
              }
            }
            console.log(newQuantity);
            
          }
          
          return {
            ...cart,
            quantity: newQuantity,
          };
        })
      ],
    };
  })
);

export function cartReducer(state: any | undefined, action: Action) {
  return reducer(state, action);
}
