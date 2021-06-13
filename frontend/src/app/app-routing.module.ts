import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEquipmentComponent } from './equipment/create/create.component';
import { ListEquipmentComponent } from './equipment/list/list.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [



  {
    path: '',component:IndexComponent,
  children: [
    {
      path:'equipos', 
      children: [
        {path: '',component:ListEquipmentComponent},
        {path:'crear',component:CreateEquipmentComponent},
        // {path:'editar',component:EditEquipmentComponent},
        
      ]
    }

  ]
  },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
