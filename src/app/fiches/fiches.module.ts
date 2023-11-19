import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeFichesComponent } from './liste-fiches/liste-fiches.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AjouterModifierFicheComponent } from './ajouter-modifier-fiche/ajouter-modifier-fiche.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FichesRoutingModule } from './fiches-routing.module';




@NgModule({
  declarations: [
    ListeFichesComponent,
    AjouterModifierFicheComponent,
    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FichesRoutingModule    

  ]
})
export class FichesModule { }
