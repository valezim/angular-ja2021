import { Component, OnInit, Output } from '@angular/core';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-destinos-top',
  templateUrl: './destinos-top.component.html',
  styleUrls: ['./destinos-top.component.css'],
})
export class DestinosTopComponent implements OnInit {
  ventas = this.ventaService.getVentas();
  paquetes = this.ventaService.getPaquetes();
  constructor(private ventaService: VentaService) {}

  ngOnInit() {}

  /*Destinos TOP: Se deberá mostrar en un componente un listado con los destinos que hayan
sido vendidos más de tres veces, se mostrará el destino y la cantidad de veces que fue
vendido.
*/
  calcularCantidadVentasPaquete(idPaquete: any) {
    const ventasDePaquete = this.ventas?.filter(
      (vent) => vent?.id_paquete === idPaquete
    );
    if (ventasDePaquete === undefined) {
      return 0;
    }
    return ventasDePaquete?.length;
  }

  obtenerTopDestinos() {
    return this.paquetes?.filter(
      (p) => this.calcularCantidadVentasPaquete(p) > 3
    );
  }
}
