import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { VentaService } from '../venta.service';
import { Router } from '@angular/router';
import { Paquete } from '../paquete';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName = this.userService.getUserName();
  paquetes = this.ventaService.getPaquetes();
  constructor(
    private userService: UserService,
    private ventaService: VentaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPaquetes();
  }

  //   getAllPaquetes() {
  //     const apikey = this.userService.getApiKey;
  //     this.ventaService.getAllPaquetes(apikey).subscribe(
  //       (paquetes : Paquete[][]) => {
  //         this.ventaService.updatePaquetes(paquetes);
  //       },
  //     );
  //   }

  getAllPaquetes() {
    const apikey = this.userService.getApiKey();
    console.log(apikey)
    this.ventaService.getAllPaquetes(apikey).subscribe((response: PaqueteResponse) => {
      this.ventaService.updatePaquetes(response.destinos);
      this.paquetes = response.destinos;
    
    },
    (error: any) => {
      //alert(error);
    });
  }
}

export interface PaqueteResponse{
  code: number;
  destinos: Paquete[]
}
