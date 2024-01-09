import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPensionComponent } from './list-pension/list-pension.component';
import { PensionDetailComponent } from './pension-detail/pension-detail.component';
import { PaiementDetailComponent } from './paiement-detail/paiement-detail.component';

const routes: Routes = [
  { path: 'list', component: ListPensionComponent },
  { path: 'pensionDetail/:id', component: PensionDetailComponent },
  { path: 'paiementDetail/:id', component: PaiementDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionRoutingModule { }
