import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn:'root'
})

export class UserService {
  user: any;

  constructor(private http: HttpClient) {}

  setUser(user: any) {
    this.user = user;
  }

  getUserId() {
    return this.user?.id;
  }

  getApiKey() {
    return this.user?.apiKey;
  }

  logOut(){
    this.user = undefined;
  }

  login(usuario: string, password: string) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify({ usuario, password });
    return this.http.post('https://destinos.develotion.com/login.php', body, {
      headers
    });
  }
}