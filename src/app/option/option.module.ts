import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionRoutingModule } from './option-routing.module';
import { ListOptionComponent } from './list-option/list-option.component';
import { AddOptionComponent } from './add-option/add-option.component';
import { EditOptionComponent } from './edit-option/edit-option.component';
import { DeleteOptionComponent } from './delete-option/delete-option.component';
import { OptionDetailComponent } from './option-detail/option-detail.component';


@NgModule({
  declarations: [
    OptionDetailComponent
  ],
  imports: [
    DeleteOptionComponent,
    EditOptionComponent,
    AddOptionComponent,
    ListOptionComponent,
    CommonModule,
    OptionRoutingModule
  ]
})
export class OptionModule { }
