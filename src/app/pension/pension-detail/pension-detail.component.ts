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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { FormsModule } from '@angular/forms';

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
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class PensionDetailComponent implements OnInit {

  id: string | null;
  annee: string | null;

  pension!: Pension
  paiement: Historique[] = [];
  annees: Annee[] = [];

  constructor(
    private service: PensionService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private servicePaiement: PaiementService,
    private anneeSer: AnneeAcademiqueService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.annee = this.route.snapshot.paramMap.get('annee')
  }

  dateTirage = new Date().toISOString();

  ngOnInit(): void {
    this.service.getPension(this.id, this.annee).subscribe(pension1 => { this.pension = pension1 })
    this.servicePaiement.getPaiement(this.id, this.annee).subscribe(paiement => { this.paiement = paiement });
    this.anneeSer.getAllAnnee().subscribe(annee => this.annees = annee)
  }

  /********************************************************************************
   * la fonction display est exécutée uniquement si l'utilisateur est un ETUDIANT
   *********************************************************************************/

  role = sessionStorage.getItem('role');

  selectedAnnee!: number;

  display() {
    this.service.getPension(this.id, this.selectedAnnee).subscribe(pension1 => { this.pension = pension1 })
    this.servicePaiement.getPaiement(this.id, this.selectedAnnee).subscribe(paiement => { this.paiement = paiement });
    this.anneeSer.getAllAnnee().subscribe(annee => this.annees = annee)
  }

  openDialogAdd(): void {
    this.dialog.open(AddPaiementComponent, {
      width: '380px',
      data: this.id
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
      data: this.pension
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
