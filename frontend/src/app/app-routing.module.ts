import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { InventoryComponent } from "./inventory/inventory.component";

const routes: Routes = [
  {
    path: '',component:IndexComponent
  },
  {
    path: 'Maintenance',
    component: MaintenanceComponent
    // children: [
    //   {path: 'crear', component: ''}
    // ]
  },
  {
    path: 'Inventory',
    component: InventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
