import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ListRegisteredStudentComponent } from './list-registered-student/list-registered-student.component';

const routes: Routes = [
  { path: 'list', component: ListStudentComponent },
  { path: 'list-registered', component: ListRegisteredStudentComponent },
  { path: 'detail/:id', component: StudentDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
