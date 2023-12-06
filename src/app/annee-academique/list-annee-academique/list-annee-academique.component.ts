import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { AddAnneeAcademiqueComponent } from '../add-annee-academique/add-annee-academique.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditAnneeAcademiqueComponent } from '../edit-annee-academique/edit-annee-academique.component';

@Component({
  selector: 'app-list-annee-academique',
  templateUrl: './list-annee-academique.component.html',
  styleUrls: ['./list-annee-academique.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,

  ]
})
export class ListAnneeAcademiqueComponent implements OnInit {
  dataSource: MatTableDataSource<Annee>;

  annees: Annee[] = [];

  constructor(
    private service: AnneeAcademiqueService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Annee>([]);

  }

  ngOnInit(): void {
    this.service.getAllAnnee().subscribe(annee => { this.annees = annee })
  }

  openDialogAdd(): void {
    this.dialog.open(AddAnneeAcademiqueComponent, {
      width: '320px',
    }).afterClosed().subscribe((annee) => {
      if (annee) {
        this.closeDialog(annee);
        this.ngOnInit()
      };
    })
  }
  openDialogEdit(row: any): void {
    this.dialog.open(EditAnneeAcademiqueComponent, {
      width: '320px',
      data: row
    }).afterClosed().subscribe((annee) => {
      if (annee) {
        this.closeDialog(annee);
        this.ngOnInit()
      };
    })
  }

  closeDialog(annee: Annee) {
    this.dataSource.data.push(annee);
    this.dataSource.data = [...this.dataSource.data];
  }

}
