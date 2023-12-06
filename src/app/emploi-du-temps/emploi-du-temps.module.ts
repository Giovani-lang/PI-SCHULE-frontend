import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmploiDuTempsRoutingModule } from './emploi-du-temps-routing.module';
import { ListEmploiDuTempsComponent } from './list-emploi-du-temps/list-emploi-du-temps.component';
import { EditEmploiDuTempsComponent } from './edit-emploi-du-temps/edit-emploi-du-temps.component';
import { AddEmploiDuTempsComponent } from './add-emploi-du-temps/add-emploi-du-temps.component';


@NgModule({
  declarations: [
    EditEmploiDuTempsComponent,
    AddEmploiDuTempsComponent
  ],
  imports: [
    ListEmploiDuTempsComponent,
    CommonModule,
    EmploiDuTempsRoutingModule
  ]
})
export class EmploiDuTempsModule { }
