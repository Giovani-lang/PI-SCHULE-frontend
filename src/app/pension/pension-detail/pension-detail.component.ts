import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { PensionService } from 'src/app/services/pension/pension.service';
import { Pension } from 'src/app/models/pension.model';
import { NgxPrintModule } from 'ngx-print';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule, } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

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

  displayedColumns: string[] = ['date', 'banque', 'numeroCompte', 'montantVerse', 'action'];
  pensions: Pension[] = []

  /* Gets the total cost of all transactions. */
  // getTotalCost() {
  //   return this.pensions.map(t => t.montantVerse).reduce((acc, value) => acc + value, 0);
  // }

  constructor(private service: PensionService) { }

  ngOnInit(): void {
    this.service.getAllPension().subscribe(pension => { this.pensions = pension })
  }

  dialogOpen = false;

  openDialog() {
    this.dialogOpen = true;
  }

  print() {
    // Logic for printing
    this.dialogOpen = false;
  }

  delete() {
    // Logic for deleting
    this.dialogOpen = false;
  }

}
