import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginGroup;
  constructor(    private formBuilder: FormBuilder) { 

    this.loginGroup = this.formBuilder.group({
      usuario: '',
      password: ''
    });

  }


  ngOnInit() {
  }

  formSubmit(){
    console.log(this.loginGroup.value);
  }

}