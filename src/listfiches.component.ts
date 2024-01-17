import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Fiches } from 'src/app/models/fiches';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FichesService } from 'src/app/services/fiches.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddficheComponent } from '../addfiche/addfiche.component';
import { UpdateficheComponent } from '../updatefiche/updatefiche.component';
import { DeleteficheComponent } from '../deletefiche/deletefiche.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listfiches',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    RouterModule],
  templateUrl: './listfiches.component.html',
  styleUrls: ['./listfiches.component.css']
})
export class ListfichesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'niveau', 'enseignant', 'matiere','date','horaire','session','etudiant','present', 'actions'];

  dataSource!: MatTableDataSource<Fiches>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  fiches: Fiches[] = []; 

  constructor(public dialog: MatDialog, public service: FichesService) {
    this.dataSource = new MatTableDataSource<Fiches>([]);

  }
  ngOnInit(): void {
    this.service.getListeFiches().subscribe(fiches => {
      this.dataSource = new MatTableDataSource(fiches)
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

  openAddFicheDialog(): void {
    this.dialog.open(AddficheComponent, {
      width: '550px',
    }).afterClosed().subscribe((fiches) => {
      if (fiches) {
        this.closeDialog(fiches);
      };
    })
  }

  refresh() {
    this.service.getListeFiches().subscribe(fiche => {
      this.dataSource = new MatTableDataSource(fiche)
      this.dataSource.paginator = this.paginator;
    });
  }

  openUpdateFicheDialog(row: any) {
    this.dialog.open(UpdateficheComponent, {
      width: '550px',
      data: row
    }).afterClosed().subscribe((fiches) => {
      if (fiches) {
        this.closeDialog(fiches);
        this.refresh()
      };
    })
  }

  openDeleteFicheDialog(row: any) {
    this.dialog.open(DeleteficheComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((fiches) => {
      if (fiches) {
        this.closeDialog(fiches);
        this.refresh()
      };
    })
  }

  closeDialog(fiches: Fiches) {
    this.dataSource.data.push(fiches);
    this.dataSource.data = [...this.dataSource.data];
  }
}
