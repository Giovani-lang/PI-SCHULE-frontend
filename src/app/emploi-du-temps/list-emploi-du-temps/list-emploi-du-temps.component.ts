import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Emploi } from 'src/app/models/emploiDuTemps.model';
import { EmploiDutempsService } from 'src/app/services/emploiDutemps/emploi-dutemps.service';
import { AddEmploiDuTempsComponent } from '../add-emploi-du-temps/add-emploi-du-temps.component';
import { EditEmploiDuTempsComponent } from '../edit-emploi-du-temps/edit-emploi-du-temps.component';
import { DeleteEmploiDuTempsComponent } from '../delete-emploi-du-temps/delete-emploi-du-temps.component';


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

  displayedColumns: string[] = ['annee', 'semestre', 'classe', 'actions'];
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

  openDialogAdd(): void {
    this.dialog.open(AddEmploiDuTempsComponent, {
      width: '380px',
    }).afterClosed().subscribe((emploi) => {
      if (emploi) {
        this.closeDialog(emploi);
      };
    })
  }
  openDialogEdit(row: any): void {
    this.dialog.open(EditEmploiDuTempsComponent, {
      width: '380px',
      data: row
    }).afterClosed().subscribe((emploi) => {
      if (emploi) {
        this.closeDialog(emploi);
        this.ngOnInit();
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteEmploiDuTempsComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((emploi) => {
      if (emploi) {
        this.closeDialog(emploi);
        this.ngOnInit();
      };
    })
  }

  closeDialog(emploi: Emploi) {
    this.dataSource.data.push(emploi);
    this.dataSource.data = [...this.dataSource.data];
  }

}
