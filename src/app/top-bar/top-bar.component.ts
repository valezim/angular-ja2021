import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLogoutVisible = false;
  constructor(     private userService: UserService) { }

  ngOnInit() {
  }

  logOut(){
    this.isLogoutVisible = false;
    this.userService.logOut();
  }

  showNavBar(){
      this.isLogoutVisible = true;
  }


}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/