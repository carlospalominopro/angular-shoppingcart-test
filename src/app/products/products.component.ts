import { Component, OnInit } from '@angular/core';
import { AppState } from '../utils/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectListProducts } from './store/selectors/selectors';
import { getProducts } from './store/actions/actions';
import Product from '../utils/products.interface';
import Cart from '../utils/cart.interface';
import { selectCartProducts, selectFindProduct } from './cart/store/selectors/selectors';
import {
  addProduct,
  deleteProduct,
  getCart,
} from './cart/store/actions/actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  
  products$: Observable<any> = new Observable();
  cart$: Observable<any> = new Observable();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getProducts());
    this.products$ = this.store.select(selectListProducts);
    this.cart$ = this.store.select(selectCartProducts);
    this.checkCart();
  }

  checkCart() {
    this.store.dispatch(getCart());
  }

  add(product: Product) {
    const cart: Cart = {
      product: product,
      quantity: 1,
    };
    this.store.dispatch(addProduct({ cart }));
  }

  delete(product: Product) {
    this.store.dispatch(deleteProduct({ productId: product.id }));
  }

  verify(productId: number) : Observable<any> {    
    return this.store.select(selectFindProduct(productId));    
  }
}
