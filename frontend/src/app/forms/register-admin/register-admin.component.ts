import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent implements OnInit {
  adminData: any;
  file!: File;
  formData = new FormData();
  srcImg: String;
  message: String;
  $boxMessage!: HTMLElement;
  classChange: any;
  classSelected: string;

  constructor(private userservice: UserService) {
    this.adminData = {
      role: '60ba3ebc2d179b23735bead3',
    };

    this.srcImg = 'assets/img/userPhoto.jpeg';
    this.message = '';
    this.classChange = {
      success: ['alert', 'alert-success'],
      error: ['alert', 'alert-danger'],
    };
    this.classSelected = '';
  }

  ngOnInit(): void {}

  registerAdmin() {
    this.$boxMessage = document.getElementById('msg') as HTMLElement;
    if (
      !this.file ||
      !this.adminData.name ||
      !this.adminData.userName ||
      !this.adminData.password ||
      !this.adminData.email
    ) {
      console.log('Incomplete data');

      this.message = 'Error: Incomplete data';
      this.classSelected = 'error';
      this.classChange[this.classSelected].forEach((element: any) =>
        this.$boxMessage.classList.toggle(element)
      );
    } else {
      this.formData.append('name', this.adminData.name);
      this.formData.append('userName', this.adminData.userName);
      this.formData.append('password', this.adminData.password);
      this.formData.append('email', this.adminData.email);
      this.formData.append('avatar', this.file, this.file.name);
      this.formData.append('role', this.adminData.role);

      this.userservice.registerUser(this.formData).subscribe(
        (res) => {
          console.log(res);
          this.message = 'Administrador Creado';
          this.classSelected = 'success';
          this.classChange[this.classSelected].forEach((element: any) =>
            this.$boxMessage.classList.toggle(element)
          );
          this.adminData = {}
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.classSelected = 'error';
          this.classChange[this.classSelected].forEach((element: any) =>
            this.$boxMessage.classList.toggle(element)
          );
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

  closeBox(time: number) {
    setTimeout(() => {
      this.classChange[this.classSelected].forEach((element: any) =>
        this.$boxMessage.classList.toggle(element)
      );
      this.message = '';
      this.classSelected = '';
    }, time);
  }
}
