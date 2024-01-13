import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteLemploiComponent } from '../delete-lemploi/delete-lemploi.component';
import { Lemploi } from 'src/app/models/lemploi.model';
import { EditLemploiComponent } from '../edit-lemploi/edit-lemploi.component';
import { AddLemploiComponent } from '../add-lemploi/add-lemploi.component';
import { LemploiService } from 'src/app/services/lemploi/lemploi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-lemploi',
  templateUrl: './list-lemploi.component.html',
  styleUrls: ['./list-lemploi.component.css'],
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
    RouterModule,
    CommonModule
  ]
})
export class ListLemploiComponent implements OnInit {
  displayedColumns: string[] = ['jour', 'horaires', 'matiere', 'enseignant'];
  dataSource: MatTableDataSource<Lemploi>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  classe: string | null;
  lemploi: Lemploi[] = [];

  role = sessionStorage.getItem('role');

  constructor(
    public dialog: MatDialog,
    public service: LemploiService,
    private route: ActivatedRoute,
  ) {
    this.dataSource = new MatTableDataSource<Lemploi>([]);
    this.classe = this.route.snapshot.paramMap.get('classe')
    /********************************************************
     * Colonne des actions réserves uniquement à l'ADMIN 
     ****************************************************** */
    if (this.role == 'ADMIN') {
      this.displayedColumns.push('actions');
    }

  }

  ngOnInit(): void {
    this.service.getAllByClasse(this.classe).subscribe(lemploi => {
      this.dataSource = new MatTableDataSource(lemploi);
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
    this.dialog.open(AddLemploiComponent, {
      width: '550px',
    }).afterClosed().subscribe((lemploi) => {
      if (lemploi) {
        this.closeDialog(lemploi);
      };
    })
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditLemploiComponent, {
      width: '550px',
      data: row
    }).afterClosed().subscribe((lemploi) => {
      if (lemploi) {
        this.closeDialog(lemploi);
        this.ngOnInit()
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteLemploiComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((lemploi) => {
      if (lemploi) {
        this.closeDialog(lemploi);
        this.ngOnInit();
      };
    })
  }


  closeDialog(lemploi: Lemploi) {
    this.dataSource.data.push(lemploi);
    this.dataSource.data = [...this.dataSource.data];
  }
}