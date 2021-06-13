import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateEquipmentComponent implements OnInit {
title:string;
form:FormGroup;
myFilename:any;
  constructor(private fb:FormBuilder,) { 
    this.title ="Crear Equipo";
    this.form = this.fb.group({
      name: ['',Validators.required],
      definition: ['',Validators.required],
      brand: ['',Validators.required],
      modelEquip: ['',Validators.required],
      serie: ['',Validators.required],
      weight: ['',Validators.required],
      provider: ['',Validators.required],
      invimaReg: ['',Validators.required],
      usefulLife: ['',Validators.required],
      noInvima: ['',Validators.required],
      length: ['',Validators.required],
      width: ['',Validators.required],
      depth: ['',Validators.required],
      photo: ['',],
    });
  }
  fileChangeEvent(fileInput: any) {
  console.log(fileInput.target.files);
    // if (fileInput.target.files && fileInput.target.files[0]) {


    //   this.myFilename = '';
    //   Array.from(fileInput.target.files).forEach((file: File) => {
    //     console.log(file);
    //     this.myFilename += file.name + ',';
    //   });

    //   const reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     const image = new Image();
    //     image.src = e.target.result;
    //     image.onload = rs => {

    //       // Return Base64 Data URL
    //       const imgBase64Path = e.target.result;

    //     };
    //   };
    //   reader.readAsDataURL(fileInput.target.files[0]);

    //   // Reset File Input to Selct Same file again
    //   this.uploadFileInput.nativeElement.value = "";
    // } else {
    //   this.myfilename = 'Select File';
    // }
  }
  ngOnInit(): void {
  }
ObSubmit(){

}
}
