import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClasseComponent } from './list-classe/list-classe.component';
import { ClasseDetailComponent } from './classe-detail/classe-detail.component';

const routes: Routes = [
  { path: "list", component: ListClasseComponent },
  { path: "list/detail/:classe", component: ClasseDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
