import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasseRoutingModule } from './classe-routing.module';
import { ListClasseComponent } from './list-classe/list-classe.component';
import { AddClasseComponent } from './add-classe/add-classe.component';
import { EditClasseComponent } from './edit-classe/edit-classe.component';
import { DeleteClasseComponent } from './delete-classe/delete-classe.component';
import { ClasseDetailComponent } from './classe-detail/classe-detail.component';

@NgModule({
  declarations: [
  ],
  imports: [
    ClasseDetailComponent,
    EditClasseComponent,
    DeleteClasseComponent,
    AddClasseComponent,
    ListClasseComponent,
    CommonModule,
    ClasseRoutingModule
  ]
})
export class ClasseModule { }
