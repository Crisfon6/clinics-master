import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-register-clinic',
  templateUrl: './register-clinic.component.html',
  styleUrls: ['./register-clinic.component.css'],
})
export class RegisterClinicComponent implements OnInit {
  clinicData: any;
  userData: any;
  file!: File;
  formData = new FormData();
  formDataClinic = new FormData();
  srcImg: String;
  message: String;
  $boxMessage!: HTMLElement;
  classChange:any;
  classSelected:string;

  constructor(
    private userservice: UserService,
    private clinicservice: ClinicService
  ) {
    this.userData = {
      role: '60c39be0e676d2d66d41a4d4',
    };

    this.clinicData = {};
    this.srcImg = 'assets/img/userPhoto.jpeg';
    this.message = '';
    this.classChange={
      success:['alert','alert-success'],
      error:['alert','alert-danger']
    }
    this.classSelected = ''
  }

  ngOnInit(): void {}

  registerClinic() {

    this.$boxMessage= document.getElementById('msg') as HTMLElement
    if (
      !this.file ||
      !this.userData.name ||
      !this.userData.userName ||
      !this.userData.password ||
      !this.userData.email
    ) {
      console.log('Incomplete data');
      this.message ="Error: Incomplete data"
      this.classSelected="error"    
      this.classChange[this.classSelected].
      forEach((element:any) => this.$boxMessage.classList.toggle(element));
    } else {
      console.log(this.file);

      this.formData.append('name', this.userData.name);
      this.formData.append('userName', this.userData.userName);
      this.formData.append('password', this.userData.password);
      this.formData.append('email', this.userData.email);
      this.formData.append('avatar', this.file, this.file.name);
      this.formData.append('role', this.userData.role);

      this.userservice.registerUser(this.formData).subscribe(
        (res: any) => {
          console.log(res);
          const id = res.idRes;

          this.clinicData.userId = id;
          this.clinicservice.registerClinic(this.clinicData).subscribe(
            (res) => {
              console.log(res);
              this.message ="Administrador Creado"
              this.classSelected ="success"
              this.classChange[this.classSelected].
              forEach((element:any) => this.$boxMessage.classList.toggle(element));
              this.userData = {}
              this.clinicData = {}
            },
            (err) => {
              console.log(err);
              this.message ="Error: No se pudo crear Clinica"
              this.classSelected="error"    
              this.classChange[this.classSelected].
              forEach((element:any) => this.$boxMessage.classList.toggle(element));
            }
          );
        },
        (err) => {
          console.log(err);
          this.message ="Error: No se pudo crear Clinica"
              this.classSelected="error"    
              this.classChange[this.classSelected].
              forEach((element:any) => this.$boxMessage.classList.toggle(element));
        }
      );
    }
    this.closeBox(5000);
  }

  processImg(imageInput: any) {
    this.file = imageInput.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.srcImg = e.target.result;
    };
  }

  closeBox(time:number){
    setTimeout(()=>{
      if(this.classSelected){
      this.classChange[this.classSelected].
      forEach((element:any) => this.$boxMessage.classList.toggle(element));
      this.message = '';
    this.classSelected = ''
  }
 
    },time)

  }
}
