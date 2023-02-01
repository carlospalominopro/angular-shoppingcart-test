import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import Cart from './cart.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public API = 'http://localhost:3000';
  private cart: Cart[] = [];

  constructor(private http: HttpClient) {
    try {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
      this.cart = [];
      localStorage.removeItem('cart');
    }
  }

  authLogin() {
    const url = this.API + '/users';
    return this.http.get(url);
  }

  getProducts() {
    const url = this.API + '/products';
    return this.http.get(url);
  }

  // LOCALSTORAGE

  getItem(index: string) {
    return JSON.parse(localStorage.getItem(index) || '0') || null;
  }

  setItem(index: string, value: string) {
    if (localStorage.getItem(index)) {
      return throwError(() => {
        message: 'Item already exists';
      });
    } else {
      localStorage.setItem(index, value);
      return 'OK';
    }
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('is_login')) {
      return true;
    } else {
      return false;
    }
  }

  // CART

  initCart(): Observable<boolean> {
    const cart = this.getItem('cart');

    if (!cart) {
      this.setItem('cart', '[]');
    }

    return of(true);
  }

  public getCart(): Observable<Cart[]> {
    const cart = this.getItem('cart');

    if (!cart) {
      this.setItem('cart', '[]');
    }

    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return of(this.cart);
  }

  addToCart(item: Cart): Observable<boolean> {
    this.initCart();

    this.cart = [...this.cart, item];
    this.updateList();
    return of(true);
  }

  removeOfCart(id: number): Observable<any> {
    this.cart = [...this.cart.filter((p) => p.product.id !== id)];
    this.updateList();
    return of(true);
  }

  modifyQuantityS(value: boolean, productId: number): Observable<boolean> {
    this.cart = [
      ...this.cart.map((p: Cart) => {
        let newQuantity = 0 + p.quantity;

        if (p.product.id == productId) {
          // ADD
          if (value) {
            newQuantity += 1;

            // MINUS
          } else {
            if (newQuantity > 1) {
              newQuantity -= 1;
            }
          }

          console.log(newQuantity);
        }

        return {
          ...p,
          quantity: newQuantity,
        };
      }),
    ];

    this.updateList();
    return of(true);
  }

  clearCart(): Observable<any> {
    this.setItem('cart', '[]');

    this.cart = [];
    return of(true);
  }

  private updateList() {
    const data = JSON.stringify(this.cart);
    try {
      localStorage.setItem('cart', data);
    } catch (err) {}
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
