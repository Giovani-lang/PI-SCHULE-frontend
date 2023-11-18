import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterModifierFicheComponent } from './ajouter-modifier-fiche/ajouter-modifier-fiche.component';
import { ListeFichesComponent } from './liste-fiches/liste-fiches.component';

const routes: Routes = [
  {path: "ajouter-Modifier", component: AjouterModifierFicheComponent},
  {path: "listefiches" ,component: ListeFichesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FichesRoutingModule { }