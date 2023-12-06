import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Matiere } from 'src/app/models/matiere.model';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { AddMatiereComponent } from '../add-matiere/add-matiere.component';
import { MatiereDetailComponent } from '../matiere-detail/matiere-detail.component';
import { EditMatiereComponent } from '../edit-matiere/edit-matiere.component';
import { DeleteMatiereComponent } from '../delete-matiere/delete-matiere.component';

@Component({
  selector: 'app-list-matiere',
  templateUrl: './list-matiere.component.html',
  styleUrls: ['./list-matiere.component.css'],
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
export class ListMatiereComponent implements OnInit {
  displayedColumns: string[] = ['id', 'code', 'intitule', 'coefficient', 'actions'];
  dataSource: MatTableDataSource<Matiere>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  matieres: Matiere[] = [];

  constructor(public dialog: MatDialog, public service: MatiereService) {
    this.dataSource = new MatTableDataSource<Matiere>([]);

  }

  ngOnInit(): void {
    this.service.getAllMatiere().subscribe(matiere => {
      this.dataSource = new MatTableDataSource(matiere)
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
    this.dialog.open(AddMatiereComponent, {
      width: '380px',
    }).afterClosed().subscribe((matiere) => {
      if (matiere) {
        this.closeDialog(matiere);
      };
    })
  }

  refresh() {
    this.service.getAllMatiere().subscribe(matiere => {
      this.dataSource = new MatTableDataSource(matiere)
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogDetail(row: any) {
    this.dialog.open(MatiereDetailComponent, {
      width: '600px',
      data: row
    }).afterClosed().subscribe((matiere) => {
      if (matiere) {
        this.closeDialog(matiere);
      };
    })
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditMatiereComponent, {
      width: '380px',
      data: row
    }).afterClosed().subscribe((matiere) => {
      if (matiere) {
        this.closeDialog(matiere);
        this.refresh()
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteMatiereComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((matiere) => {
      if (matiere) {
        this.closeDialog(matiere);
        this.refresh()
      };
    })
  }

  closeDialog(matiere: Matiere) {
    this.dataSource.data.push(matiere);
    this.dataSource.data = [...this.dataSource.data];
  }

}
