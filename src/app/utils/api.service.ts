import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import Cart from './cart.interface';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API = 'http://localhost:3000';

  private cart: Cart[] = [];
  private updateCartSub = new Subject<any>();

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

  getItem(index : string) {
    return JSON.parse(localStorage.getItem(index) || '0') || null;
  }

  setItem(index : string, value : string) {
    if(localStorage.getItem(index)){
      return throwError(() => {message : 'Item already exists'});
    }else{
      localStorage.setItem(index, value)
      return 'OK';
    }
  }

  isAuthenticated() : boolean{
    if(localStorage.getItem('is_login')){
      return true
    }else{
      return false;
    }
  }

  // CART

  initCart() : boolean{

    const cart = this.getItem('cart');

    if(!cart){
      this.setItem('cart', '[]');
      return true
    }else{
      return false;
    }

  }

  addAlCart(cart: Cart) {
    this.cart.push(cart);
    this.updateList();
  }

  updateCart(cart: Cart[]) {
    this.cart = cart;
    this.updateList();
  }

  private updateList() {
    const data = JSON.stringify(this.cart);
    try {
      localStorage.setItem('cart', data);
    } catch (err) {
    }
    this.updateCartSub.next(true);
  }


  public get getCart(): Cart[] {

    try {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
    }

    return this.cart;
  }

  removeOfCart(id: number) {
    this.cart = this.cart.filter(p => p.product.id !== id);
    this.updateList();
  }

  viewUpdateProducts(): Observable<any> {
    return this.updateCartSub.asObservable();
  }


  logout(){
    localStorage.clear();
    location.reload();
  }

}
