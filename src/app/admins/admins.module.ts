import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { ListAdminsComponent } from './list-admins/list-admins.component';
import { AddAdminsComponent } from './add-admins/add-admins.component';
import { EditAdminsComponent } from './edit-admins/edit-admins.component';
import { DeleteAdminsComponent } from './delete-admins/delete-admins.component';
import { AdminsDetailComponent } from './admins-detail/admins-detail.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    ListAdminsComponent,
    AddAdminsComponent,
    DeleteAdminsComponent,
    EditAdminsComponent,
    AdminsDetailComponent
  ]
})
export class AdminsModule { }
