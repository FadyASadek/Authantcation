import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClint: HttpClient) {}
  url = 'http://localhost:5063/api';
  createAccount(form: any) {
    return this.httpClint.post(this.url + '/signUP', form);
  }
  signin(form: any) {
    return this.httpClint.post(this.url + '/signin', form);
  }
}
