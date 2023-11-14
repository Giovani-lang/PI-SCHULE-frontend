import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { DeleteTeacherComponent } from './delete-teacher/delete-teacher.component';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ListTeacherComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    DeleteTeacherComponent,
    TeacherDetailComponent
  ]
})
export class TeacherModule { }
