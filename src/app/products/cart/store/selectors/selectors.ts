import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/utils/app.state';
import CartState from '../../cart.state';
import Cart from '../../../../utils/cart.interface';

export const selectCart = (state: AppState) => state.cart;

export const selectCartProducts = createSelector(
  selectCart,
  (state: CartState) => state.cart
);

export const selectFindProduct = (productId: number) =>
  createSelector(selectCart, (state: CartState) =>
    state.cart.find((cart: Cart) => cart.product.id === productId)
  );

export const selectResumeCart = createSelector(
  selectCart,
  (state: CartState) => ({

    quantityTotal : state.cart.reduce((accumulator, object) => {
      return accumulator + object.quantity;
    }, 0),
    
    total : state.cart.reduce((accumulator, object) => {
      return accumulator + (object.product.cost * object.quantity);
    }, 0),

  })
);
