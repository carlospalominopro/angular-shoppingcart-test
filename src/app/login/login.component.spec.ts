import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductEffects } from '../products/store/effects/effects';
import { ApiService } from '../utils/api.service';
import { ROOT_REDUCERS } from '../utils/app.state';
import { ErrorCatchingInterceptor } from '../utils/error.interceptor';
import { MaterialModule } from '../utils/material/material.module';

import { LoginComponent } from './login.component';
import { UserEffects } from './store/effects/effects';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreDevtoolsModule.instrument({
          name: 'Test',
        }),
        EffectsModule.forRoot([UserEffects, ProductEffects]),
      ],
      providers: [
        ApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorCatchingInterceptor,
          multi: true,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a username and password inputs', () => {
    
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;    

    const username = compiled.querySelector('input[formControlName=username]')
    const password = compiled.querySelector('input[formControlName=password]')
    
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
  

  });

  it('should test form validity', () => {
    const form = component.formLogin;
    expect(form.valid).toBeFalsy();

    const usernameInput = form.get('username');
    usernameInput?.setValue('test1');
    
    const passwordInput = form.get('password');
    passwordInput?.setValue('123456');

    expect(form.valid).toBeTruthy();
  })


});
