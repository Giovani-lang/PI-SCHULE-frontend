import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';

const routes: Routes = [
  {path:'list', component:ListProduitComponent},
  {path:'add', component:AddProduitComponent},
  {path:'edit', component:EditProduitComponent},
  {path:'detail/:id', component:DetailProduitComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitsRoutingModule { }
