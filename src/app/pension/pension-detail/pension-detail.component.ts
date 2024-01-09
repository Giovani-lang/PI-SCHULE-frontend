import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { PensionService } from 'src/app/services/pension/pension.service';
import { Pension } from 'src/app/models/pension.model';
import { NgxPrintModule } from 'ngx-print';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule, } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Historique } from 'src/app/models/historique.model';
import { AddPaiementComponent } from '../add-paiement/add-paiement.component';
import { PaiementService } from 'src/app/services/paiement/paiement.service';
import { EditPensionComponent } from '../edit-pension/edit-pension.component';

@Component({
  selector: 'app-pension-detail',
  templateUrl: './pension-detail.component.html',
  styleUrls: ['./pension-detail.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    MatTableModule,
    NgxPrintModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatMenuModule
  ]
})
export class PensionDetailComponent implements OnInit {
  id: string | null;
  pension!: Pension
  paiement: Historique[] = [];

  constructor(
    private service: PensionService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private servicePaiement: PaiementService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  dateTirage = new Date().toISOString();

  ngOnInit(): void {
    this.service.getPension(this.id).subscribe(pension1 => { this.pension = pension1 })
    this.servicePaiement.getPaiement(this.id).subscribe(paiement => { this.paiement = paiement })
  }

  openDialogAdd(): void {
    this.dialog.open(AddPaiementComponent, {
      width: '380px',
    }).afterClosed().subscribe((pension) => {
      if (pension) {
        this.closeDialog(pension);
        this.ngOnInit();
      };
    })
  }

  openDialogEditPension() {
    this.dialog.open(EditPensionComponent, {
      width: '380px',
      data: this.id
    }).afterClosed().subscribe((pension) => {
      if (pension) {
        this.closeDialog(pension)
        this.ngOnInit()
      }
    })
  }

  closeDialog(pension: Historique) {
    this.paiement.push(pension);
    this.paiement = [...this.paiement];
  }

}
