import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service'
import {EmployeeService} from "../../services/employee.service"; 
@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {
  employeeData:any;
  userData:any;

  constructor(private userservice:UserService,  private empService:EmployeeService) { 
      this.userData = {
        avatar:"url:avatar",
        role:"60c39be0e676d2d66d41a4d4"
    }

    this.employeeData = {
      CV:"URL"

    }
  }

  ngOnInit(): void {
  }
  
  registerEmployee(){

    console.log(this.userData)
    if(! this.userData.avatar ||
      ! this.userData.name   ||
      ! this.userData.userName ||
      ! this.userData.password ||
      ! this.userData.email
     ){
       console.log("Incomplete data")
       //this.userservice.registerUser(this.adminData)
     }
     else{
       console.log(this.userData)
           this.userservice.registerUser(this.userData).subscribe(
             (res:any)=>{
               console.log(res)
               const id = res.idRes;
               this.employeeData.userId = id;
                console.log(this.employeeData)
               this.empService.registerEmployee(this.employeeData).subscribe(
                 res=>{
                   console.log(res)
                 },err=>{
                  console.log(err)
                 }
               )
             },(err)=>{
               console.log(err)
             }
           )

     }

  }
}
