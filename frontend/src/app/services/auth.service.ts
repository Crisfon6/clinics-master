import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userToken:string;
    private baseUrl:string;
    constructor(private http:HttpClient){
    this.baseUrl = environment.baseUrl;
    this.userToken = '';
    }
    private saveToken(idToken:string,){
        this.userToken = idToken;
        localStorage.setItem('token',idToken);
    }
    readToken() {
        if (localStorage.getItem('token')) {
          this.userToken = localStorage.getItem('token') || '';
        } else {
          this.userToken = '';
        }
        return this.userToken;
      }
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.userToken = '';
      }
      get token(){
          return this.userToken;
      }
}