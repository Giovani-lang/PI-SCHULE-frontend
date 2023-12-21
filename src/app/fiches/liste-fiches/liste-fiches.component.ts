import { Component, ViewChild } from '@angular/core';
import { AjoutModifFichesComponent } from '../ajout-modif-fiches/ajout-modif-fiches.component';
import { Fiches } from 'src/app/models/fiches';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FichesService } from 'src/app/fiches.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/core.service';

@Component({
  selector: 'app-liste-fiches',
  templateUrl: './liste-fiches.component.html',
  styleUrls: ['./liste-fiches.component.css'],
  standalone: true,

  imports:[
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatDialogModule
  ]

})
export class ListeFichesComponent {

  fiche!: Fiches

  displayedColumns: string[] = [
    'id', 
    'niveau',
    'enseignant', 
    'matiere', 
    'date',
    'horaire',
    'session',
    'etudiant',
    'action',
  ];

  dataSource!: MatTableDataSource<Fiches>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fichesService: FichesService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,
     private coreService: CoreService) {}

  ngOnInit(): void {

    this.fichesService.getListeFiches().subscribe(
      fiche => {
      this.dataSource = new MatTableDataSource(fiche);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAjoutModifFichesForm() {
    const dialogRef = this.dialog.open(AjoutModifFichesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fichesService.getListeFiches();
        }
      },
    });
  }

  getListeFiches() {
    this.fichesService.getListeFiches().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFiche(id: number) {
    this.fichesService.deleteFiche(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Fiche supprimée !', 'succès!');
        this.getListeFiches();
      },
      error: console.log,
    });
  }

  openModificationFichesForm(data: any) {
    const dialogRef = this.dialog.open(AjoutModifFichesComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListeFiches();
        }
      },
    });
  }


}
