import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsRoutingModule } from './produits-routing.module';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListProduitComponent,
    EditProduitComponent,
    DetailProduitComponent,
    AddProduitComponent,
  ],
  imports: [
    CommonModule,
    ProduitsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProduitsModule { }
