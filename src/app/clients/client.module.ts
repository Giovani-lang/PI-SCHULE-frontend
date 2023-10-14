import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClienEditComponent } from './clien-edit/clien-edit.component';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientAddComponent,
    ClienEditComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
