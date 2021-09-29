import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paquete } from '../interfaces/paquete';
import { PaqueteResponse } from '../interfaces/paquete-response';
import { Venta } from '../interfaces/venta';
import { VentaResponse } from '../interfaces/venta-response';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  paquetes: Paquete[] | undefined;
  ventas: Venta[] | undefined;

  constructor(private http: HttpClient) {}

  updatePaquetes(paquetes: Paquete[]) {
    this.paquetes = undefined;
    this.paquetes = paquetes;
  }

  getPaquetes() {
    return this.paquetes;
  }

  updateVentas(ventas: Venta[]) {
    this.ventas = undefined;
    this.ventas = ventas;
  }

  getVentas() {
    return this.ventas;
  }

  logOut() {
    this.paquetes = [];
    this.ventas = [];
  }

  getAllPaquetes(token: any) {
    const headers = {
      'Content-type': 'application/json',
      apikey: token,
    };
    return this.http.get<PaqueteResponse>(
      'https://destinos.develotion.com/paquetes.php',
      {
        headers,
      }
    );
  }

  agregarVenta(
    token: any,
    idVendedor: number,
    nombreCliente: string,
    idPaquete: number,
    cantidadMayores: number,
    cantidadMenores: number
  ) {
    const headers = {
      'Content-type': 'application/json',
      apikey: token,
    };
    const body = JSON.stringify({
      idVendedor,
      nombreCliente,
      idPaquete,
      cantidadMayores,
      cantidadMenores,
    });
    return this.http.post('https://destinos.develotion.com/ventas.php', body, {
      headers,
    });
  }

  obtenerVentasDeVendedor(token: any, id: any) {
    const idVendedor = id;
    const headers = {
      'Content-type': 'application/json',
      apikey: token,
    };
    return this.http.get<VentaResponse>(
      'https://destinos.develotion.com/ventas.php?idVendedor=' + idVendedor,
      {
        headers,
      }
    );
  }

  obtenerPaquetePorId(id: any) {
    const paquete = this.paquetes?.find((paq) => paq?.id === id);
    return paquete;
  }

  calcularCantidadVentasPaquete(idPaquete: any) {
    const ventas = this.getVentas();
    const ventasDePaquete = ventas?.filter(
      (vent) => vent?.id_paquete === idPaquete
    );
    if (ventasDePaquete === undefined) {
      return 0;
    }
    return ventasDePaquete?.length;
  }

}
