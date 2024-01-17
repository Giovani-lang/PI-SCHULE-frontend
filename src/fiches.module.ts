import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichesRoutingModule } from './fiches-routing.module';
import { AddficheComponent } from './addfiche/addfiche.component';
import { UpdateficheComponent } from './updatefiche/updatefiche.component';
import { ListfichesComponent } from './listfiches/listfiches.component';
import { DeleteficheComponent } from './deletefiche/deletefiche.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FichesRoutingModule,
    AddficheComponent,
    UpdateficheComponent,
    ListfichesComponent,
    DeleteficheComponent,
  ]
})
export class FichesModule { }
