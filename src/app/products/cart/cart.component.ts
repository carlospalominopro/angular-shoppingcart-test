import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import Product from '../../utils/products.interface';
import { ApiService } from '../../utils/api.service';
import Cart from '../../utils/cart.interface';
import { Router } from '@angular/router';
import { AppState } from 'src/app/utils/app.state';
import { Store } from '@ngrx/store';
import { deleteProduct, clearCart, getCart, modifyQuantity } from './store/actions/actions';
import { selectCartProducts, selectResumeCart } from './store/selectors/selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$: Observable<any> = new Observable();
  summary$: Observable<any> = new Observable();


  constructor(
    private toastr: ToastrService,
    public router: Router,
    public service: ApiService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    
    this.store.dispatch(getCart());

    this.cart$ = this.store.select(selectCartProducts);
    this.summary$ = this.store.select(selectResumeCart);

  }

  changeInput(value :boolean, productId : number) {
    this.store.dispatch(modifyQuantity({value, productId}))
  }


  delete(product : Product) {
    this.store.dispatch(deleteProduct({ productId: product.id }));
  }

  checkout(){
    
    this.store.dispatch(clearCart());
    this.toastr.success('Thanks for purchase!')
    this.router.navigate(['/products'])
  }

}
