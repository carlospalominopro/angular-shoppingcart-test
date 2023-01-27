import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../utils/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectListProducts } from './store/selectors/selectors';
import { getProducts } from './store/actions/actions';
import Product from '../utils/products.interface';
import { ApiService } from '../utils/api.service';
import Cart from '../utils/cart.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  products$: Observable<any> = new Observable();
  countProducts: number = 0;

  cart: Cart[] = [];

  inCart: any;

  constructor(
    private store: Store<AppState>,
    public service: ApiService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getProducts());
    this.products$ = this.store.select(selectListProducts);
    this.checkCart();
    this.updateCart()
  }

  checkCart() {
    this.service.initCart();
  }

  add(product : Product) {
    const pro: Cart = {
      product : product,
      quantity: 1,
    };
    this.service.addAlCart(pro);
    this.updateCart()
  }

  delete(product : Product) {
    this.service.removeOfCart(product?.id);
    this.updateCart()
  }

  verify(product : Product) {
    return this.service.getCart.find((p) => p.product.id === product?.id);
  }

  updateCart() {
    this.cart = this.service.getCart;
    this.countProducts = this.cart.length;
  }

}
