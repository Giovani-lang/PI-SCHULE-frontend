import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichesRoutingModule } from './fiches-routing.module';
import { ListeFichesComponent } from './liste-fiches/liste-fiches.component';
import { AjoutModifFichesComponent } from './ajout-modif-fiches/ajout-modif-fiches.component';


@NgModule({
  declarations: [
    ListeFichesComponent,
  ],
  imports: [
    CommonModule,
    FichesRoutingModule,
    AjoutModifFichesComponent
  ]
})
export class FichesModule { }
