import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOptionComponent } from './list-option/list-option.component';

const routes: Routes = [
  { path: "list", component: ListOptionComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionRoutingModule { }
