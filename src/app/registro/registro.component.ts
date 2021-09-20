import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerGroup;
  errMsg: any;
    constructor(   
       private formBuilder: FormBuilder,
       private userService: UserService,
       private topBar: TopBarComponent,
       private router: Router
       ) { 
  
      this.registerGroup = this.formBuilder.group({
        usuario: '',
        password: ''
      });
  
    }
  
  
    ngOnInit() {
    }
  
    formSubmit() {
      this.errMsg = '';
      const { usuario, password } = this.registerGroup.value;
      this.userService.register(usuario, password).subscribe(
        user => {
          this.userService.setUser(user, usuario);
          this.topBar.showNavBar();
          this.router.navigate(['/dashboard']);
        },
        ({ error: { mensaje } }) => {
         // this.errMsg = mensaje;
         this.errMsg = 'El usuario que trata de registrar ya existe.';
        }
      );
    }
  
}