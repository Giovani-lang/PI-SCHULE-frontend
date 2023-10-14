import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClienEditComponent } from './clien-edit/clien-edit.component';
import { ClientAddComponent } from './client-add/client-add.component';

const routes: Routes = [
  {path:"list", component:ClientListComponent},
  {path:"edit", component:ClienEditComponent},
  {path:"add", component:ClientAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
