import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productActions from '../actions/actions';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/utils/api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private service: ApiService,
    private toastr: ToastrService
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.getProducts),
      mergeMap(() =>  this.service.getProducts()
      .pipe(
          map((resp : any) => {

            return productActions.setProducts({ products : resp });
          }),
          catchError((err : any) => {
            this.toastr.error(err);
            return [];
          })
        )
      )
    )
  );
}
