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
    private toastr: ToastrService,
    private store: Store<AppState>,
    public service: ApiService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getProducts());
    this.products$ = this.store.select(selectListProducts);
    this.checkCart();
    this.updateProductos()
  }

  checkCart() {
    this.service.initCart();
  }

  add(producto : Product) {
    const pro: Cart = {
      product : producto,
      quantity: 1,
    };
    this.service.agregarAlCarrito(pro);
    this.updateProductos()
  }

  delete(product : Product) {
    this.service.quitarDelCarrito(product?.id);
    this.updateProductos()
  }

  verify(product : Product) {
    return this.service.getCarrito.find((p) => p.product.id === product?.id);
  }

  updateProductos() {
    this.cart = this.service.getCarrito;
    this.countProducts = this.cart.length;
  }

}
