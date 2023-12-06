import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatiereRoutingModule } from './matiere-routing.module';
import { MatiereDetailComponent } from './matiere-detail/matiere-detail.component';
import { AddMatiereComponent } from './add-matiere/add-matiere.component';
import { EditMatiereComponent } from './edit-matiere/edit-matiere.component';
import { DeleteMatiereComponent } from './delete-matiere/delete-matiere.component';
import { ListMatiereComponent } from './list-matiere/list-matiere.component';


@NgModule({
  declarations: [
    MatiereDetailComponent,
  ],
  imports: [
    DeleteMatiereComponent,
    AddMatiereComponent,
    EditMatiereComponent,
    ListMatiereComponent,
    CommonModule,
    MatiereRoutingModule
  ]
})
export class MatiereModule { }
