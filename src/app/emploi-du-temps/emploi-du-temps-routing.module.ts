import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmploiDuTempsComponent } from './list-emploi-du-temps/list-emploi-du-temps.component';

const routes: Routes = [
  { path: "list", component: ListEmploiDuTempsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmploiDuTempsRoutingModule { }
