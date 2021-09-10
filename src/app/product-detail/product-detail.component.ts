import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, products } from '../products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const productId = this.route.snapshot.params.productId;
    //distraction:
    //const {snapshot: {params: {productId}}} = this.route;
    this.product = products.find((p: Product) => p.id == productId); //===+productId
    console.log(this.product);

    //ver salida de los params en consola
    //console.log(this.route.snapshot.params);
  }
}
