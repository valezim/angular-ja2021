import { Component, OnInit, Output } from '@angular/core';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-destinos-sin-ventas',
  templateUrl: './destinos-sin-ventas.component.html',
  styleUrls: ['./destinos-sin-ventas.component.css'],
})
export class DestinosSinVentasComponent implements OnInit {
  constructor(private ventaService: VentaService) {}

  ngOnInit() {}

  obtenerDestinosSinVentas() {
    const paquetes = this.ventaService.getPaquetes();
    const paquetesFiltrados = paquetes?.filter(
      ({ id }) => this.ventaService.calcularCantidadVentasPaquete(id) === 0
    );
    return paquetesFiltrados;
  }
}
