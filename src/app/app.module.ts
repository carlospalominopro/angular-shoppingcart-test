import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ActionReducer,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ApiService } from './utils/api.service';
import { ErrorCatchingInterceptor } from './utils/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './utils/material/material.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppState, ROOT_REDUCERS } from './utils/app.state';
import { UserEffects } from './login/store/effects/effects';
import { ProductEffects } from './products/store/effects/effects';
import { LoginGuard } from './utils/login.guard';
import { CartEffects } from './products/cart/store/effects/effects';
import { LogoutComponent } from './logout/logout.component';

export function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
 
    return reducer(state, action);
  };
}
 
export const metaReducers: MetaReducer<AppState>[] = [debug];

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(ROOT_REDUCERS, {metaReducers}),
    StoreDevtoolsModule.instrument({
      name: 'Test',
    }),
    EffectsModule.forRoot([UserEffects, ProductEffects, CartEffects]),
  ],
  providers: [
    ApiService,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
