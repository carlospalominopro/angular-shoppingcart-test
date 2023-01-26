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
  public resumen = { total: 0, quantity: 0 };


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
    this.service.actualizarCarrito(this.cart);
  }

  delete(product : Product) {
    this.service.quitarDelCarrito(product?.id);
    this.updateProducts()
  }

  updateProducts() {
    this.cart = this.service.getCarrito;
    this.countProducts = this.cart.length;

    this.resumen = { total: 0, quantity: 0 };
    this.cart.forEach((p) => {
      this.resumen.total += p.product.cost * p.quantity;
      this.resumen.quantity += p.quantity;
    });
  }

  checkout(){
    this.service.actualizarCarrito([]);
    this.updateProducts()
    this.toastr.success('Thanks for purchase!')
    this.router.navigate(['/products'])
  }

}
