import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAnneeAcademiqueComponent } from './list-annee-academique/list-annee-academique.component';

const routes: Routes = [
  { path: "list", component: ListAnneeAcademiqueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnneeAcademiqueRoutingModule { }
