import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Product from '../../utils/products.interface';
import { ApiService } from '../../utils/api.service';
import Cart from '../../utils/cart.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  countProducts: number = 0;
  cart: Cart[] = [];
  inCart: any;

  private subs: Subscription[] = [];
  public summary = { total: 0, quantity: 0 };


  constructor(
    private toastr: ToastrService,
    public service: ApiService,
    public router: Router,
  ) {}

  ngOnInit(): void {

    this.checkCart();

    this.updateProducts();

    this.subs.push(
      this.service.viewUpdateProducts().subscribe((res) => {
        this.updateProducts();
      })
    );
  }

  checkCart() {
    this.service.initCart();
  }

  changeInput(opt :number, cart : Cart) {
    // MINUS
    if (opt == 1) {
      if (cart.quantity > 1) {
        cart.quantity -= 1;
      }
    }

    // PLUS
    if (opt == 2) {
      cart.quantity += 1;
    }

    if (cart.quantity <= 1) {
      cart.quantity = 1;
    }

    this.updateQuantity()
  }

  updateQuantity() {
    this.service.updateCart(this.cart);
  }

  delete(product : Product) {
    this.service.removeOfCart(product?.id);
    this.updateProducts()
  }

  updateProducts() {
    this.cart = this.service.getCart;
    this.countProducts = this.cart.length;

    this.summary = { total: 0, quantity: 0 };
    this.cart.forEach((p) => {
      this.summary.total += p.product.cost * p.quantity;
      this.summary.quantity += p.quantity;
    });
  }

  checkout(){
    this.service.updateCart([]);
    this.updateProducts()
    this.toastr.success('Thanks for purchase!')
    this.router.navigate(['/products'])
  }

}
