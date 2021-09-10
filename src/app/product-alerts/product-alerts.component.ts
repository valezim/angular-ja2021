import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../products';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {
  @Input() product!: Product;
  @Output() notify = new EventEmitter();
  constructor() {}

  ngOnInit() {} //aca definir cuando se pega a la API
  //cuando mas de un componente le pega a la API no hacerla por cada componente
  //sino que debemos crear una entidad en comun
  onNotify() {
    this.notify.emit();
    //window.alert('Hola');
  }
}
