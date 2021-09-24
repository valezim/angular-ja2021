import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  isLogoutVisible = true;
  constructor() {}

  ngOnInit() {}

  logOut() {
    this.isLogoutVisible = false;
  }

  setLogoutVisible(value: boolean) {
    this.isLogoutVisible = value;
  }
}
