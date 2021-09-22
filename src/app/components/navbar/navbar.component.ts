import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private userService: UserService,
    private ventaService: VentaService
  ) {}

  ngOnInit() {}

  logOut() {
    this.userService.logOut();
    this.ventaService.logOut();
  }
}
