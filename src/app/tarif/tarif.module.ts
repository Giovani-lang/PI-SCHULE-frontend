import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifRoutingModule } from './tarif-routing.module';
import { AddTarifComponent } from './add-tarif/add-tarif.component';
import { EditTarifComponent } from './edit-tarif/edit-tarif.component';
import { ListTarifComponent } from './list-tarif/list-tarif.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TarifRoutingModule,
    AddTarifComponent,
    EditTarifComponent,
    ListTarifComponent
  ]
})
export class TarifModule { }
