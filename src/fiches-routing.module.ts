import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddficheComponent } from './addfiche/addfiche.component';
import { UpdateficheComponent } from './updatefiche/updatefiche.component';
import { DeleteficheComponent } from './deletefiche/deletefiche.component';
import { ListfichesComponent } from './listfiches/listfiches.component';

const routes: Routes = [
  {path:'addfiche', component: AddficheComponent},
  {path:'updatefiche/:id', component: UpdateficheComponent},
  {path:'deletefiche/:id', component: DeleteficheComponent},
  {path:'listfiches', component: ListfichesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichesRoutingModule { }

