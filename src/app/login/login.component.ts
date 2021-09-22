import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginGroup;
  errMsg: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    //   private topBar: TopBarComponent,
    private router: Router
  ) {
    this.loginGroup = this.formBuilder.group({
      usuario: '',
      password: '',
    });
  }

  ngOnInit() {}

  formSubmit() {
    this.errMsg = '';
    const { usuario, password } = this.loginGroup.value;
    this.userService.login(usuario, password).subscribe(
      (user) => {
        console.log(user);
        this.userService.setUser(user, usuario);
        //   this.topBar.setLogoutVisible(true);
        this.router.navigate(['/dashboard']);
      },
      ({ error: { mensaje } }) => {
        this.errMsg = mensaje;
        //  this.errMsg = '¡Oops! El usuario y/o la contraseña son incorrectos.';
      }
    );
  }
}
