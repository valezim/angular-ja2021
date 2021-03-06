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
    const cantPaquetes = this.ventaService?.getVentas()?.length;
    if (cantPaquetes === undefined) {
      return 0;
    } else {
      return cantPaquetes;
    }
  }
}
