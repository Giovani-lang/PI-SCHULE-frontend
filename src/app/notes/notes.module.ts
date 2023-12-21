import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { ListeDesNotesComponent } from './liste-des-notes/liste-des-notes.component';
import { AjoutModifNotesComponent } from './ajout-modif-notes/ajout-modif-notes.component';


@NgModule({
  declarations: [ ],
  
  imports: [
    CommonModule,
    NotesRoutingModule,
    AjoutModifNotesComponent,
    ListeDesNotesComponent,
  ]
})
export class NotesModule { }
