import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {
  StoreModule,
} from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ApiService } from './utils/api.service';
import { ErrorCatchingInterceptor } from './utils/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utils/material/material.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './utils/app.state';
import { UserEffects } from './login/store/effects/effects';
import { ProductEffects } from './products/store/effects/effects';
import { LoginGuard } from './utils/login.guard';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreDevtoolsModule.instrument({
          name: 'Test',
        }),
        EffectsModule.forRoot([UserEffects, ProductEffects]),
      ],
      declarations: [
        AppComponent
      ],
      providers : [
        ApiService,
        LoginGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorCatchingInterceptor,
          multi: true,
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });
});
