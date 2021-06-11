import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:String = environment.APP_URL

  constructor(private http:HttpClient) {

   }

   registerUser(userBody:any){
    return this.http.post(this.baseUrl+"users/registerUser",userBody)
   }
}
