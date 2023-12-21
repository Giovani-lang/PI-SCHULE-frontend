import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutModifFichesComponent } from './ajout-modif-fiches/ajout-modif-fiches.component';
import { ListeFichesComponent } from './liste-fiches/liste-fiches.component';

const routes: Routes = [
  {path:"liste", component:ListeFichesComponent},
  {path:"ajoutModif", component:AjoutModifFichesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichesRoutingModule { }
