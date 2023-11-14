import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { PensionService } from 'src/app/services/pension/pension.service';
import { Pension } from 'src/app/models/pension.model';

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
  ]
})
export class PensionDetailComponent implements OnInit {

  displayedColumns: string[] = ['date', 'banque', 'numeroCompte', 'montantVerse', 'action'];
  pensions: Pension[] = []

  /* Gets the total cost of all transactions. */
  getTotalCost() {
    return this.pensions.map(t => t.montantVerse).reduce((acc, value) => acc + value, 0);
  }

  constructor(private service: PensionService) { }

  ngOnInit(): void {
    this.service.getAllPension().subscribe(pension => { this.pensions = pension })
  }

}
