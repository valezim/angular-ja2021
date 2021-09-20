import { Injectable } from '@angular/core';
import { Product } from './products';

@Injectable({
  providedIn:'root'
}
)
export class CartService {
items: Product[] = [];
  constructor() { }


purchaseProduct(product: Product) {
this.items = [...this.items, product];
}

getItems(){
  return this.items;
}

clearCart(){
  this.items = [];
  return this.items;
}

}