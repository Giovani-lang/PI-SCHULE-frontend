import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Filiere } from 'src/app/models/filiere.model';
import { FiliereService } from 'src/app/services/filiere/filiere.service';
import { AddFiliereComponent } from '../add-filiere/add-filiere.component';
import { EditFiliereComponent } from '../edit-filiere/edit-filiere.component';
import { FiliereDetailComponent } from '../filiere-detail/filiere-detail.component';
import { DeleteFiliereComponent } from '../delete-filiere/delete-filiere.component';

@Component({
  selector: 'app-list-filiere',
  templateUrl: './list-filiere.component.html',
  styleUrls: ['./list-filiere.component.css'],
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
export class ListFiliereComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'actions'];
  dataSource: MatTableDataSource<Filiere>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  admins: Filiere[] = [];

  constructor(public dialog: MatDialog, public service: FiliereService) {
    this.dataSource = new MatTableDataSource<Filiere>([]);

  }

  ngOnInit(): void {
    this.service.getAllFiliere().subscribe(filiere => {
      this.dataSource = new MatTableDataSource(filiere)
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
    this.dialog.open(AddFiliereComponent, {
      width: '320px',
    }).afterClosed().subscribe((filiere) => {
      if (filiere) {
        this.closeDialog(filiere);
      };
    })
  }

  refresh() {
    this.service.getAllFiliere().subscribe(filieres => {
      this.dataSource = new MatTableDataSource(filieres)
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditFiliereComponent, {
      width: '320px',
      data: row
    }).afterClosed().subscribe((filiere) => {
      if (filiere) {
        this.closeDialog(filiere);
        this.refresh()
      };
    })
  }
  openDialogDetail(row: any) {
    this.dialog.open(FiliereDetailComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((filiere) => {
      if (filiere) {
        this.closeDialog(filiere);
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteFiliereComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((filiere) => {
      if (filiere) {
        this.closeDialog(filiere);
        this.refresh()
      };
    })
  }


  closeDialog(filieres: Filiere) {
    this.dataSource.data.push(filieres);
    this.dataSource.data = [...this.dataSource.data];
  }

}
