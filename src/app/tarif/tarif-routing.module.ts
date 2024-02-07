import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTarifComponent } from './list-tarif/list-tarif.component';

const routes: Routes = [
  { path: "list", component: ListTarifComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifRoutingModule { }
