import { Component } from '@angular/core';

import { products } from '../products';

//import { products, Product } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = products;
  //products:Product = products;
  share() {
    window.alert('The product has been shared!');
  }

  //puede ser cualquier otro nombre
  onNotify() {
    window.alert('We notify you');
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
