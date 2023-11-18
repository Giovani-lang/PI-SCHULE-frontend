import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListenotesComponent } from './listenotes/listenotes.component';
import { AjouterModifierNotesComponent } from './ajouter-modifier-notes/ajouter-modifier-notes.component';



@NgModule({
  declarations: [
    ListenotesComponent,
    AjouterModifierNotesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NotesModule { }
