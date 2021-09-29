import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CantidadPaquetesComponent } from './components/cantidad-paquetes/cantidad-paquetes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DestinosTopComponent } from './components/destinos-top/destinos-top.component';
import { DestinosSinVentasComponent } from './components/destinos-sin-ventas/destinos-sin-ventas.component';
import { GraficasComponent } from './components/graficas/graficas.component';
 import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]),
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    CantidadPaquetesComponent,
    NavbarComponent,
    DestinosTopComponent,
    DestinosSinVentasComponent,
    GraficasComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}