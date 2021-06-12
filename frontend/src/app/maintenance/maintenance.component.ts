import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent implements OnInit {
  public registerData: any;
  public successMessage: String;
  public errorMessage: String;
  public selectedValue: string;

  foods: Food[] = [
    { value: 'Equipo_1', viewValue: 'Equipo 1' },
    { value: 'Equipo_22', viewValue: 'Equipo 22' },
    { value: 'Equipo_333', viewValue: 'Equipo 333' },
  ];

  constructor() {
    this.registerData = {};
    this.successMessage = '';
    this.errorMessage = '';
    this.selectedValue = '';
  }

  ngOnInit(): void {}

  registerMaintenance() {
    if (
      !this.registerData.EmployeeId ||
      !this.registerData.equipment ||
      !this.registerData.description
    ) {
      console.log("Error: Data incomplete, could not register maintenance");
      this.errorMessage = 'Error: Data incomplete, could not register maintenance';
      this.registerData = {};
    } else {
      console.log("Register successful.");
    }
  }
}
