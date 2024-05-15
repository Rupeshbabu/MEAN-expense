import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(user: any) {
    return this.http.post(`${environment.localAPI}/auth/signup`, user);
  }

  signIn(user: any) {
    return this.http.post(`${environment.localAPI}/auth/signin`, user);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getUserFromToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodejwt = jwt_decode.jwtDecode(token);
      return decodejwt;
    } else {
      return null;
    }
  }
}
