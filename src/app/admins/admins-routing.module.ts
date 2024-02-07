import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAdminsComponent } from './list-admins/list-admins.component';

const routes: Routes = [
  { path: 'list', component: ListAdminsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
