import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  srcImg!: String;
  message: String;
  $boxMessage!: HTMLElement;
  classChange: any;
  classSelected: string;
  @ViewChild('imgInput')
  imgImput!: ElementRef;

  constructor(private userservice: UserService) {
    this.message = '';
    this.classChange = {
      success: ['alert', 'alert-success'],
      error: ['alert', 'alert-danger'],
    };
    this.classSelected = '';
    this.starVar();  //function to restart variables
  }

  ngOnInit(): void {}

/*Function is used to restart the variables
  after to send data or when the cycle starts
*/
  starVar() {
    this.adminData = {
      role: '60ba3ebc2d179b23735bead3',
    };
    this.srcImg = 'assets/img/userPhoto.jpeg';
    if (this.imgImput) this.imgImput.nativeElement.value = null;
  }

  /*
    Function to register  the admin, it verifies if 
    the object is empty and show the message 
  */

  registerAdmin() {
    this.$boxMessage = document.getElementById('msg') as HTMLElement;
    if (
      !this.file ||
      !this.adminData.name ||
      !this.adminData.userName ||
      !this.adminData.password ||
      !this.adminData.email
    ) {
      this.message = 'Error: Incomplete data';
      this.classSelected = 'error';
      this.classChange[this.classSelected].forEach((element: any) =>
        this.$boxMessage.classList.toggle(element)
      );

      this.closeBox(4000); //wait 4000 milisenconds  and close de the box
    } else {
      /* 
      We use formdata to send the body because the current object is not
      able to send images
      */
      this.formData.append('name', this.adminData.name);
      this.formData.append('userName', this.adminData.userName);
      this.formData.append('password', this.adminData.password);
      this.formData.append('email', this.adminData.email);
      this.formData.append('avatar', this.file, this.file.name);
      this.formData.append('role', this.adminData.role);

      this.userservice.registerUser(this.formData).subscribe(
        (res) => {
          this.message = 'Administrador Creado';
          this.classSelected = 'success';
          /* this foreach toggle the respectively classes in classXhange obcject
          according to classSelected variable
          */
          this.classChange[this.classSelected].forEach((element: any) =>
            this.$boxMessage.classList.toggle(element)
          );
          this.starVar(); //function to restart form 
          this.closeBox(4000);
        },
        (err) => {
          this.message = err.error;
          this.classSelected = 'error';
          this.classChange[this.classSelected].forEach((element: any) =>
            this.$boxMessage.classList.toggle(element)
          );
          this.closeBox(4000);
        }
      );
    }
  }

  /* 
  Function to process theinput  images from onchange event
  and use the info to change property sc in img tag and show the 
  image
  */
  processImg(imageInput: any) {
    this.file = imageInput.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.srcImg = e.target.result;
    };
  }

  /*Function to manage the message , recieve a number that indicate 
    the time miliseconds that box will be  shown
  */

  closeBox(time: number) {
    setTimeout(() => {
      if (this.classSelected) {
        this.classChange[this.classSelected].forEach((element: any) =>
          this.$boxMessage.classList.toggle(element)
        );
        this.message = '';
        this.classSelected = '';
      }
    }, time);
  }
}
