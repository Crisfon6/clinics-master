import { Component, OnInit } from '@angular/core';

interface Clinic {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;
  public selectedValue: string;

  clinics: Clinic[] = [
    {value: 'Santa_Catalina', viewValue: 'Santa Catalina'},
    {value: 'Los_Andes', viewValue: 'Los Andes'},
  ];

  constructor() {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
    this.selectedValue = '';
  }

  ngOnInit(): void {
  }

  registerInventory() {
    if (!this.registerData.clinic || !this.registerData.equipment ) {
      console.log("Error: Data incomplete");
      this.errorMessage = 'Error: Data incomplete';
      this.registerData = {};
    } else {
      console.log("Register successful.");
      
    }
  }

}
