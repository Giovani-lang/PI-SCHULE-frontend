import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Pension } from 'src/app/models/pension.model';
import { PensionService } from 'src/app/services/pension/pension.service';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-list-pension',
  standalone: true,
  templateUrl: './list-pension.component.html',
  styleUrls: ['./list-pension.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    MatCheckboxModule
  ]
})
export class ListPensionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'matricule', 'nom', 'prenom', 'pensionAnnuelle', 'montantVerse', 'montantRestant', 'statut', 'actions'];
  dataSource: MatTableDataSource<Pension>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pensions: Pension[] = [];

  constructor(public dialog: MatDialog, public service: PensionService) {
    this.dataSource = new MatTableDataSource<Pension>([]);

  }

  ngOnInit(): void {
    this.service.getAllPension().subscribe(pensions => {
      this.dataSource = new MatTableDataSource(pensions)
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
