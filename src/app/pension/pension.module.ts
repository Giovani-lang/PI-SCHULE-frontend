import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PensionRoutingModule } from './pension-routing.module';
import { ListPensionComponent } from './list-pension/list-pension.component';
import { PensionDetailComponent } from './pension-detail/pension-detail.component';
import { EditPensionComponent } from './edit-pension/edit-pension.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { PaiementDetailComponent } from './paiement-detail/paiement-detail.component';
import { AddPensionComponent } from './add-pension/add-pension.component';

@NgModule({
  declarations: [
  ],
  imports: [
    PaiementDetailComponent,
    AddPensionComponent,
    AddPaiementComponent,
    CommonModule,
    PensionRoutingModule,
    ListPensionComponent,
    EditPensionComponent,
    PensionDetailComponent,
  ],
})
export class PensionModule { }
