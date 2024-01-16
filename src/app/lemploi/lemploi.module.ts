import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LemploiRoutingModule } from './lemploi-routing.module';
import { AddLemploiComponent } from './add-lemploi/add-lemploi.component';
import { EditLemploiComponent } from './edit-lemploi/edit-lemploi.component';
import { ListLemploiComponent } from './list-lemploi/list-lemploi.component';
import { DeleteLemploiComponent } from './delete-lemploi/delete-lemploi.component';


@NgModule({
  declarations: [
  ],
  imports: [
    EditLemploiComponent,
    AddLemploiComponent,
    ListLemploiComponent,
    CommonModule,
    LemploiRoutingModule,
    DeleteLemploiComponent,
  ]
})
export class LemploiModule { }
