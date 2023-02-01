import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as cartActions from '../actions/actions';
import * as productActions from '../../../store/actions/actions';

import { map, catchError, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/utils/api.service';
import { ToastrService } from 'ngx-toastr';
import Cart from 'src/app/utils/cart.interface';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private service: ApiService,
    private toastr: ToastrService
  ) {}

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.getCart),
      mergeMap(() =>
        this.service.getCart().pipe(
          map((cart: Cart[]) => {            
            return cartActions.getDataCart({ cart });
          }),
          catchError((err: any) => {
            this.toastr.error(err);
            return [];
          })
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.addProduct),
      mergeMap(({cart}: any) => {

        return this.service.addToCart(cart).pipe(
          map((res: boolean) => {            
            return cartActions.getCart();
          }),
          catchError((err: any) => {
            this.toastr.error(err);
            return [];
          })
        )
      }
      )
    )
  );
  
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.deleteProduct),
      mergeMap(({productId}: any) => {
        return this.service.removeOfCart(productId).pipe(
          map((res: boolean) => {            
            return cartActions.getCart();
          }),
          catchError((err: any) => {
            this.toastr.error(err);
            return [];
          })
        )
      }
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.clearCart),
      mergeMap(() => {
        return this.service.clearCart().pipe(
          map((res: boolean) => {            
            return cartActions.getCart();
          }),
          catchError((err: any) => {
            this.toastr.error(err);
            return [];
          })
        )
      }
      )
    )
  );
  
  modifyQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.modifyQuantity),
      mergeMap(({value, productId} : any) => {

        return this.service.modifyQuantityS(value, productId).pipe(
          map((res: boolean) => {            
            return cartActions.getCart();
          }),
          catchError((err: any) => {
            this.toastr.error(err);
            return [];
          })
        )
      }
      )
    )
  );
}
