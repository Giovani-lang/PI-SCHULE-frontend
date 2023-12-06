import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnneeAcademiqueRoutingModule } from './annee-academique-routing.module';
import { ListAnneeAcademiqueComponent } from './list-annee-academique/list-annee-academique.component';
import { AddAnneeAcademiqueComponent } from './add-annee-academique/add-annee-academique.component';
import { EditAnneeAcademiqueComponent } from './edit-annee-academique/edit-annee-academique.component';


@NgModule({
  declarations: [

  ],
  imports: [
    AddAnneeAcademiqueComponent,
    ListAnneeAcademiqueComponent,
    CommonModule,
    AnneeAcademiqueRoutingModule,
    EditAnneeAcademiqueComponent
  ]
})
export class AnneeAcademiqueModule { }
