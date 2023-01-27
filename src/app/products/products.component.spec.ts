import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from '../login/store/effects/effects';
import { ApiService } from '../utils/api.service';
import { ROOT_REDUCERS } from '../utils/app.state';
import { ErrorCatchingInterceptor } from '../utils/error.interceptor';
import { MaterialModule } from '../utils/material/material.module';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';
import { ProductEffects } from './store/effects/effects';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        CommonModule,
        ProductsRoutingModule,
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
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
