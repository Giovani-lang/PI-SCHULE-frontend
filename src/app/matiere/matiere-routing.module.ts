import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMatiereComponent } from './list-matiere/list-matiere.component';

const routes: Routes = [
  { path: "list", component: ListMatiereComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatiereRoutingModule { }
