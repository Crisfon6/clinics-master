import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service'
@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  adminData:any;
  $imgPhoto = document.getElementById("imgPhoto");

  constructor(private userservice:UserService) {
    this.adminData = {
      avatar:"url:avatar",
      role:"60ba3ebc2d179b23735bead3"
    }
   }

  ngOnInit(): void {
  }

  registerAdmin(){
    if(! this.adminData.avatar ||
       ! this.adminData.name   ||
       ! this.adminData.userName ||
       ! this.adminData.password ||
       ! this.adminData.email
      ){
        console.log("Incomplete data")
        //this.userservice.registerUser(this.adminData)
      }
      else{
        console.log(this.adminData)
            this.userservice.registerUser(this.adminData).subscribe(
              (res)=>{
                console.log(res)
              },(err)=>{
                console.log(err)
              }
            )

      }

  }


  processImg(imageInput:any){
    const file:File = imageInput.files[0]
  console.log(file)

  }
}
