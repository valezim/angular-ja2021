import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginGroup;
errMsg: any;
  constructor(   
     private formBuilder: FormBuilder,
     private userService: UserService,
     private router: Router
     ) { 

    this.loginGroup = this.formBuilder.group({
      usuario: '',
      password: ''
    });

  }


  ngOnInit() {
  }

  formSubmit() {
    this.errMsg = '';
    const { usuario, password } = this.loginGroup.value;
    this.userService.login(usuario, password).subscribe(
      user => {
        this.userService.setUser(user);
        console.log(user);
        this.router.navigate(['/list']);
      },
      ({ error: { mensaje } }) => {
        this.errMsg = mensaje;
      }
    );
  }

}