import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ListStudentComponent } from './list-student/list-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ListRegisteredStudentComponent } from './list-registered-student/list-registered-student.component';


@NgModule({
  declarations: [

  ],
  imports: [
    ListRegisteredStudentComponent,
    CommonModule,
    StudentRoutingModule,
    ListStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    DeleteStudentComponent,
    StudentDetailComponent,
  ]
})
export class StudentModule { }
