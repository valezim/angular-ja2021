import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginGroup;
  constructor(   
     private formBuilder: FormBuilder,
     private userService: UserService
     ) { 

    this.loginGroup = this.formBuilder.group({
      usuario: '',
      password: ''
    });

  }


  ngOnInit() {
  }

  formSubmit(){
    const {usuario, password} = this.loginGroup.value;
    this.userService.login(usuario, password).subscribe(
      user => {
        console.log(user);
      }
    );
  }

}