import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiliereRoutingModule } from './filiere-routing.module';
import { FiliereDetailComponent } from './filiere-detail/filiere-detail.component';
import { AddFiliereComponent } from './add-filiere/add-filiere.component';
import { EditFiliereComponent } from './edit-filiere/edit-filiere.component';
import { DeleteFiliereComponent } from './delete-filiere/delete-filiere.component';
import { ListFiliereComponent } from './list-filiere/list-filiere.component';


@NgModule({
  declarations: [
    FiliereDetailComponent,
  ],
  imports: [
    EditFiliereComponent,
    AddFiliereComponent,
    DeleteFiliereComponent,
    ListFiliereComponent,
    CommonModule,
    FiliereRoutingModule
  ]
})
export class FiliereModule { }
