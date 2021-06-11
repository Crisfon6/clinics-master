import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl:String = environment.APP_URL

  constructor(private http:HttpClient) {

   }
   registerEmployee(employeeBody:any){
    return this.http.post(this.baseUrl+"employee/registerEmployee",employeeBody)
   }

}
