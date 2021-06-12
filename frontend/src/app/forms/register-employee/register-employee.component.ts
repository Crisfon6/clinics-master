import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
})
export class RegisterEmployeeComponent implements OnInit {
  employeeData: any;
  userData: any;
  file!: File;
  filePDF!: File;
  formData = new FormData();
  formDataEmployee = new FormData();
  srcImg!: String;
  message: String;
  $boxMessage!: HTMLElement;
  classChange: any;
  classSelected: string;
  @ViewChild('imgInput')
  imgImput!: ElementRef;
  @ViewChild('pdfInput')
  pdfImput!: ElementRef;


  constructor(
    private userservice: UserService,
    private empService: EmployeeService
  ) {
    this.startVar()
    this.message = '';
    this.classChange = {
      success: ['alert', 'alert-success'],
      error: ['alert', 'alert-danger'],
    };
    this.classSelected = '';
  }

  startVar(){
    this.userData = {
      avatar: 'url:avatar',
      role: '60c39be0e676d2d66d41a4d4',
    };

    this.employeeData = {};
    this.srcImg = 'assets/img/userPhoto.jpeg';

  if(this.imgImput)  this.imgImput.nativeElement.value = null;
  if(this.pdfImput) this.pdfImput.nativeElement.value = null;
  }

  ngOnInit(): void {}

  registerEmployee() {
    this.$boxMessage = document.getElementById('msg') as HTMLElement;
    if (
      !this.userData.avatar ||
      !this.userData.name ||
      !this.userData.userName ||
      !this.userData.password ||
      !this.userData.email
    ) {
      this.message = 'Error: Incomplete data';
      this.classSelected = 'error';
      this.classChange[this.classSelected].forEach((element: any) =>
        this.$boxMessage.classList.toggle(element)
      );
      this.closeBox(5000);
    } else {
      this.userData.avatar = this.file;
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
          this.formDataEmployee.append('userId', id);
          this.formDataEmployee.append('CV', this.filePDF, this.filePDF.name);
          this.empService.registerEmployee(this.formDataEmployee).subscribe(
            (res) => {
              console.log(res);
              this.message = 'Empleado creado Satisfactoriamente';
              this.classSelected = 'success';
              this.classChange[this.classSelected].forEach((element: any) =>
                this.$boxMessage.classList.toggle(element)
              );
              this.startVar()
              this.closeBox(2000)
            },
            (err) => {
              this.message = 'Error: No se pudo crear empleado';
              this.classSelected = 'error';
              this.classChange[this.classSelected].forEach((element: any) =>
                this.$boxMessage.classList.toggle(element)
              );
              this.closeBox(2000)
            }
          );
        },
        (err) => {
          console.log(err);
          this.message = 'Error: No se pudo crear empleado';
          this.classSelected = 'error';
          this.classChange[this.classSelected].forEach((element: any) =>
            this.$boxMessage.classList.toggle(element)
          );
          this.closeBox(2000)
        }
      );
    }
  }

  processImg(imageInput: any) {
    this.file = imageInput.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.srcImg = e.target.result;
    };
  }

  processCV(cvInput: any) {
    this.filePDF = cvInput.target.files[0];
  }

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
