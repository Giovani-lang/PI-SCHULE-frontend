import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeDesNotesComponent } from './liste-des-notes/liste-des-notes.component';
import { AjoutModifNotesComponent } from './ajout-modif-notes/ajout-modif-notes.component';

const routes: Routes = [
  {path:"liste", component:ListeDesNotesComponent},
  {path:"ajoutModif", component:AjoutModifNotesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
