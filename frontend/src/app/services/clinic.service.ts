import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  baseUrl:String = environment.APP_URL

  constructor(private http:HttpClient) {

  }
  registerClinic(clinicBody:any){
   return this.http.post(this.baseUrl+"clinic/saveClinic",clinicBody)
  }
}
