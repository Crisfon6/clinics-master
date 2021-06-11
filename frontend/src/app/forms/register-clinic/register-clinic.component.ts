import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-register-clinic',
  templateUrl: './register-clinic.component.html',
  styleUrls: ['./register-clinic.component.css']
})
export class RegisterClinicComponent implements OnInit {
  clinicData:any;
  userData:any;

  constructor(private userservice:UserService, private clinicservice:ClinicService) {


    this.userData = {
      avatar:"url:avatar",
      role:"60c39be0e676d2d66d41a4d4"
  }

  this.clinicData = {}
   }

  ngOnInit(): void {
  }

  registerClinic(){
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
               this.clinicData.userId = id;
                console.log(this.clinicData)
               this.clinicservice.registerClinic(this.clinicData).subscribe(
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
