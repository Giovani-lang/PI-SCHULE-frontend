import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPensionComponent } from './list-pension/list-pension.component';
import { PensionDetailComponent } from './pension-detail/pension-detail.component';

const routes: Routes = [
  { path: 'list', component: ListPensionComponent },
  { path: 'pensionDetail/:id', component: PensionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensionRoutingModule { }
