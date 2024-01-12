import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { Historique } from 'src/app/models/historique.model';
import { PaiementService } from 'src/app/services/paiement/paiement.service';

@Component({
  selector: 'app-paiement-detail',
  templateUrl: './paiement-detail.component.html',
  styleUrls: ['./paiement-detail.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatButtonModule,
    NgxPrintModule,
    RouterModule
  ]
})
export class PaiementDetailComponent implements OnInit {
  id: string | null;
  paiement!: Historique;

  constructor(
    private route: ActivatedRoute,
    private servicePaiement: PaiementService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  dateTirage = new Date().toISOString();

  ngOnInit(): void {
    this.servicePaiement.getPaiementById(this.id).subscribe(paiement => {
      this.paiement = paiement
    })
  }

}
