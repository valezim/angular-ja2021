import { Component, OnInit, Output } from '@angular/core';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-destinos-top',
  templateUrl: './destinos-top.component.html',
  styleUrls: ['./destinos-top.component.css'],
})
export class DestinosTopComponent implements OnInit {
  constructor(private ventaService: VentaService) {}

  ngOnInit() {}

  calcularCantidadVentasPaquete(idPaquete: any) {
    return this.ventaService.calcularCantidadVentasPaquete(idPaquete);
  }

  obtenerTopDestinos() {
    const paquetes = this.ventaService.getPaquetes();
    const paquetesFiltrados = paquetes?.filter(
      ({ id }) => this.calcularCantidadVentasPaquete(id) > 3
    );
    return paquetesFiltrados;
  }
}
