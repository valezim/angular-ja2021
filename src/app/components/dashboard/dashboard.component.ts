import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VentaService } from '../../services/venta.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PaqueteResponse } from '../../interfaces/paquete-response';
import { Paquete } from '../../interfaces/paquete';
import { VentaResponse } from '../../interfaces/venta-response';
import { Venta } from '../../interfaces/venta';
import { CantidadPaquetesComponent } from '../cantidad-paquetes/cantidad-paquetes.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName = this.userService.getUserName();
  paquetes = this.ventaService.getPaquetes();
  ventas = this.ventaService.getVentas();
  venderPaqueteGroup;
  errMsg: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ventaService: VentaService,
    private router: Router
  ) {
    this.venderPaqueteGroup = this.formBuilder.group({
      idVendedor: 0,
      nombreCliente: '',
      idPaquete: 0,
      cantidadMayores: 0,
      cantidadMenores: 0,
    });
  }

  ngOnInit() {
    this.getAllPaquetes();
    this.getVentasDeVendedor();
  }

  getAllPaquetes() {
    const apikey = this.userService.getApiKey();
    this.ventaService.getAllPaquetes(apikey).subscribe(
      (response: PaqueteResponse) => {
        this.ventaService.updatePaquetes(response.destinos);
        this.paquetes = response.destinos;
        console.log('se supone que trajo los paquetes ' + this.paquetes);
      },
      (error: any) => {
        //alert(error);
      }
    );
  }

  formSubmit() {
    this.errMsg = '';
    const apikey = this.userService.getApiKey();
    const idVendedor = this.userService.getUserId();
    const { nombreCliente, idPaquete, cantidadMayores, cantidadMenores } =
      this.venderPaqueteGroup.value;
    console.log(idPaquete);
    if (
      this.validarDatosAgregarVenta(
        nombreCliente,
        cantidadMayores,
        cantidadMenores,
        idPaquete
      )
    ) {
      this.ventaService
        .agregarVenta(
          apikey,
          idVendedor,
          nombreCliente,
          idPaquete,
          cantidadMayores,
          cantidadMenores
        )
        .subscribe(
          (venta) => {
            this.getVentasDeVendedor();
          },
          ({ error: { mensaje } }) => {
            this.errMsg = mensaje;
          }
        );
    }
  }

  getVentasDeVendedor() {
    const apikey = this.userService.getApiKey();
    const id = this.userService.getUserId();
    this.ventaService.obtenerVentasDeVendedor(apikey, id).subscribe(
      (response: VentaResponse) => {
        this.ventaService.updateVentas(response.ventas);
        this.ventas = response.ventas;
      },
      (error: any) => {
        //alert(error);
      }
    );
  }

  validarDatosAgregarVenta(
    nombreCliente: string,
    cantidadMayores: number,
    cantidadMenores: number,
    idPaquete: any
  ) {
    this.errMsg = '';
    if (nombreCliente === undefined || nombreCliente === '') {
      this.errMsg = 'Debe ingresar el nombre del cliente.';
      return false;
    }
    if (cantidadMayores < 0 || cantidadMenores < 0) {
      this.errMsg = 'Debe ingresar cantidades válidas.';
      return false;
    }
    if (cantidadMayores + cantidadMenores > 10) {
      this.errMsg =
        'La cantidad de niños y adultos sumada no puede superar las 10 personas.';
      return false;
    }
    if (idPaquete === 0) {
      this.errMsg = 'Debe seleccionar un paquete.';
      return false;
    }
    return true;
  }

  calcularPrecioFinal(venta: Venta) {
    const paquete = this?.obtenerPaquetePorId(venta?.id_paquete);
    if (paquete != undefined) {
      return (
        venta?.cantidad_mayores * paquete?.precio_mayor +
        venta?.cantidad_menores * paquete?.precio_menor
      );
    }
    return 0;
  }

  obtenerPaquetePorId(id: any) {
    return this.ventaService.obtenerPaquetePorId(id);
  }

  /*Listar en una tabla todos los destinos y la cantidad total de usuarios
que viajan a ese destino (sumados adultos y niños).*/
  obtenerCantidadUsuariosDeDestino(idPaquete: any) {
    let cantidadUsuarios = 0;
    const ventasDePaquete = this.ventas?.filter(
      (vent) => vent?.id_paquete === idPaquete
    );
    ventasDePaquete?.forEach(
      (vent) =>
        (cantidadUsuarios += vent.cantidad_mayores + vent.cantidad_menores)
    );
    return cantidadUsuarios;
  }
}
