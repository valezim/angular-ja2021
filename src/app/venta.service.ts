import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paquete } from './paquete';
import { PaqueteResponse } from './dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  paquetes: Paquete[] | undefined;

  constructor(private http: HttpClient) {}

  updatePaquetes(paquetes: Paquete[]) {
    this.paquetes = undefined;
    this.paquetes = paquetes;
  }

  getPaquetes() {
    return this.paquetes;
  }

  getAllPaquetes(token: any) {
    const headers = {
      'Content-type': 'application/json',
      apikey: token,
    };
    return this.http.get<PaqueteResponse>('https://destinos.develotion.com/paquetes.php', {
      headers,
    });
  }
}
