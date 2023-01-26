import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../actions/actions';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from 'src/app/utils/api.service';
import User from 'src/app/utils/user.interface';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private service: ApiService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUser),
      mergeMap((params : any) =>  {

        const user = this.service.getItem('is_login');

        if(user){

          return of(userActions.getAuth({ user }));

        }else{

          return this.service.authLogin()
            .pipe(
                map((resp : any) => {

                  const user = resp.find(
                    (user : User) => (
                      user.username == params?.user?.username &&
                        user.password == params?.user?.password
                    )
                  );


                  if(user){
                    this.service.setItem('is_login', JSON.stringify(user));
                    return userActions.getAuth({ user });
                  }

                  return userActions.errorHand({message : 'User not found'});


                }),
                catchError((err) => {
                  return of(userActions.errorHand({message : err}));
                })
              )
        }

      })
    )
  );
}
