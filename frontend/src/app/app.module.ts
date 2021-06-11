import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './admin/list/list.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { InventoryComponent } from './inventory/inventory.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { IndexComponent } from './index/index.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


import {HttpClientModule} from '@angular/common/http';
import {FormsModule,
ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './admin/register/register.component';
import { RegisterAdminComponent } from './forms/register-admin/register-admin.component';
import { RegisterEmployeeComponent } from './forms/register-employee/register-employee.component';
import { RegisterClinicComponent } from './forms/register-clinic/register-clinic.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MaintenanceComponent,
    EquipmentComponent,
    InventoryComponent,
    IndexComponent,
    RegisterComponent,
    RegisterAdminComponent,
    RegisterEmployeeComponent,
    RegisterClinicComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
