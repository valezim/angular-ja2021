import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VentaService } from '../../services/venta.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { PaqueteResponse } from '../../interfaces/paquete-response';
import { Paquete } from '../../interfaces/paquete';
import { VentaResponse } from '../../interfaces/venta-response';
import { Venta } from '../../interfaces/venta';

import { CantidadPaquetesComponent } from '../cantidad-paquetes/cantidad-paquetes.component';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { AnalysisFailure } from '@angular/core/schematics/migrations/missing-injectable/transform';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  public chartOptions2!: Partial<ChartOptions> | any;

  userName = this.userService.getUserName();
  paquetes = this.ventaService.getPaquetes();
  ventas = this.ventaService.getVentas();
  // cantidadUsuariosDestino: any[] = [];
  // nombrePaquetes: any[] | undefined = [];

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

    this.chartOptions = {
      series: [
        {
          name: 'Cantidad',
          data: [0],
        },
      ],
      chart: {
        height: 250,
        type: 'bar',
      },
      title: {
        text: 'Usuarios por destino',
      },
      xaxis: {
        categories: ['0'],
      },
    };

    this.chartOptions2 = {
      series: [
        {
          name: 'Series 1',
          data: [],
        },
      ],
      chart: {
        height: 1000,
        type: 'radar',
      },
      title: {
        text: 'Promedio precio por paquete',
      },
      xaxis: {
        categories: [],
      },
    };
  }

  ngOnInit() {
    this.getAllPaquetes();
    this.getVentasDeVendedor();
  }

  getAllPaquetes() {
    const apikey = this.userService.getApiKey();
    this.ventaService.getAllPaquetes(apikey).subscribe(
      (response: PaqueteResponse) => {
        const paquetes = response.destinos;
        this.ventaService.updatePaquetes(paquetes);
        this.paquetes = paquetes;
        this.updateGrafica(paquetes);
      },

      (error: any) => {
        //alert(error);
      }
    );
  }

  updateGrafica(paquetes: Paquete[]) {
    if (paquetes != undefined && paquetes.length != 0) {
      const cantidadUsuariosDestino = paquetes?.map((paq) =>
        this.obtenerCantidadUsuariosDeDestino(paq.id)
      );
      const promedioPrecios = paquetes?.map((paq) =>
        this.calcularPromedioPrecioPaquete(paq)
      );
      const nombrePaquetes = paquetes?.map((paq) => paq?.nombre);
      this.chartOptions.series = [
        {
          data: cantidadUsuariosDestino,
        },
      ];
      this.chartOptions.xaxis = {
        categories: nombrePaquetes,
      };

      this.chartOptions2.series = [
        {
          data: promedioPrecios,
        },
      ];
      this.chartOptions2.xaxis = {
        categories: nombrePaquetes,
      };
    }
  }

  formSubmit() {
    this.errMsg = '';
    const apikey = this.userService.getApiKey();
    const idVendedor = this.userService.getUserId();
    const { nombreCliente, idPaquete, cantidadMayores, cantidadMenores } =
      this.venderPaqueteGroup.value;
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
        if (this.paquetes != undefined) this.updateGrafica(this.paquetes);
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
      this.errMsg = 'Debe ingresar cantidades v??lidas.';
      return false;
    }
    if (cantidadMayores + cantidadMenores > 10) {
      this.errMsg =
        'La cantidad de ni??os y adultos sumada no puede superar las 10 personas.';
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

  calcularPromedioPrecioPaquete(paquete: Paquete) {
    return (paquete.precio_mayor + paquete.precio_menor) / 2;
  }
}
