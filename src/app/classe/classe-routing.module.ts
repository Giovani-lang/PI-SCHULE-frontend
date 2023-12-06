import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClasseComponent } from './list-classe/list-classe.component';

const routes: Routes = [
  { path: "list", component: ListClasseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
