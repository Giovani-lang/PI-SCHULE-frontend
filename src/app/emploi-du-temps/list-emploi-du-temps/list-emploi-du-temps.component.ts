import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Emploi } from 'src/app/models/emploiDuTemps.model';
import { EmploiDutempsService } from 'src/app/services/emploiDutemps/emploi-dutemps.service';


@Component({
  selector: 'app-list-emploi-du-temps',
  templateUrl: './list-emploi-du-temps.component.html',
  styleUrls: ['./list-emploi-du-temps.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule
  ]
})
export class ListEmploiDuTempsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'annee', 'semestre', 'classe', 'actions'];
  dataSource: MatTableDataSource<Emploi>;

  Emplois: Emploi[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, public service: EmploiDutempsService) {
    this.dataSource = new MatTableDataSource<Emploi>([]);
  }

  ngOnInit(): void {
    this.service.getAllEmploi().subscribe(emploi => {
      this.dataSource = new MatTableDataSource(emploi)
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
