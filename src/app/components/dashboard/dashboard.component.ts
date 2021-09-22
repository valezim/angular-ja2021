import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VentaService } from '../../services/venta.service';
import { Router } from '@angular/router';
import { Paquete } from '../paquete';
import { FormBuilder } from '@angular/forms';
import { PaqueteResponse } from '../../interfaces/paquete-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName = this.userService.getUserName();
  paquetes = this.ventaService.getPaquetes();
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
    console.log('llegamos a la venta');
    this.errMsg = '';
    const apikey = this.userService.getApiKey();
    const idVendedor = this.userService.getUserId();
    const idPaquete: Paquete = this.venderPaqueteGroup.value;
    const { nombreCliente, cantidadMayores, cantidadMenores } =
      this.venderPaqueteGroup.value;
    this.ventaService
      .agregarVenta(
        apikey,
        idVendedor,
        nombreCliente,
        idPaquete.id,
        cantidadMayores,
        cantidadMenores
      )
      .subscribe(
        (venta) => {
          //     this.ventaService.obtenerVentas(apikey);
          console.log('se concreto la ventaaa');
        },
        ({ error: { mensaje } }) => {
          this.errMsg = mensaje;
        }
      );
  }
}
