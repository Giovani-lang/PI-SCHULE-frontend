import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLemploiComponent } from './list-lemploi/list-lemploi.component';

const routes: Routes = [
  { path: 'list/:classe', component: ListLemploiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LemploiRoutingModule { }
