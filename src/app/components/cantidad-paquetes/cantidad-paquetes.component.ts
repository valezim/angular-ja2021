import { Component, OnInit, Output } from '@angular/core';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-cantidad-paquetes',
  templateUrl: './cantidad-paquetes.component.html',
  styleUrls: ['./cantidad-paquetes.component.css'],
})
export class CantidadPaquetesComponent implements OnInit {
  constructor(private ventaService: VentaService) {}

  ngOnInit() {}

  getCantidadPaquetesVendidos() {
    return this.ventaService?.getPaquetes()?.length;
  }
}
