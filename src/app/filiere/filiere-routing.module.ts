import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFiliereComponent } from './list-filiere/list-filiere.component';

const routes: Routes = [
  { path: "list", component: ListFiliereComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiliereRoutingModule { }
