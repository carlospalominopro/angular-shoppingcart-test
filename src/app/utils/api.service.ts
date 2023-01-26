import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import Cart from './cart.interface';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API = 'http://localhost:3000';

  private cart: Cart[] = [];
  private updateCart = new Subject<any>();

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

  agregarAlCarrito(cart: Cart) {
    this.cart.push(cart);
    this.actualizarLista();
  }

  actualizarCarrito(cart: Cart[]) {
    this.cart = cart;
    this.actualizarLista();
  }

  private actualizarLista() {
    const data = JSON.stringify(this.cart);
    try {
      localStorage.setItem('cart', data);
    } catch (err) {
    }
    this.updateCart.next(true);
  }


  public get getCarrito(): Cart[] {

    try {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
    }

    return this.cart;
  }

  vaciarCarro() {
    this.cart = [];
    this.actualizarLista();
  }


  quitarDelCarrito(id: number) {
    this.cart = this.cart.filter(p => p.product.id !== id);
    this.actualizarLista();
  }

  viewUpdateProducts(): Observable<any> {
    return this.updateCart.asObservable();
  }


  logout(){
    localStorage.clear();
    location.reload();
  }

}
