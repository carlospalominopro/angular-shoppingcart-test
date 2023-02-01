import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from '../utils/material/material.module';
import { ApiService } from '../utils/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorCatchingInterceptor } from '../utils/error.interceptor';
import { CartComponent } from './cart/cart.component';
import { LogoutComponent } from '../logout/logout.component';


@NgModule({
  declarations: [
    ProductsComponent,
    CartComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    }
  ],
})
export class ProductsModule { }
