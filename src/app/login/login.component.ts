import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, skip } from 'rxjs';

import User from 'src/app/utils/user.interface';
import { AppState } from '../utils/app.state';
import { getUser } from './store/actions/actions';
import { selectErrorMessage, selectLoadingUsers, selectUser } from './store/selectors/selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  username : any;
  password : any;

  formLogin : FormGroup;

  loading$ : Observable<any> = new Observable();
  errorMessage$ : Observable<any> = new Observable();

  errorFlag : boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.formLogin = this.fb.group({
      username : [null, [Validators.required]],
      password : [null, [Validators.required]],
    })
  }

  ngOnInit(): void {

    this.loading$ = this.store.select(selectLoadingUsers)
    this.errorMessage$ = this.store.select(selectErrorMessage)

    this.checkUser();

  }

  submit(){

    if(this.formLogin.valid){

      this.errorFlag = true;
      const inputs = this.formLogin.value;

      const user : User = {
        username : inputs.username,
        password : inputs.password,
      };

      this.checkUser(user)

    }else{
      alert(JSON.stringify(this.formLogin.errors));
    }

  }

  checkUser(user? : any ){

    if(user){
      this.store.dispatch(getUser({user}));
    }else{
      this.store.dispatch(getUser({}));
    }

    this.store.select(selectUser)
      .subscribe((user: any) => {
        console.log(user);
        if(user?.id){
          this.errorFlag = false;
          this.router.navigate(['/products']);
        }
      })
  }

}
