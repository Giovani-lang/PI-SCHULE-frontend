import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core.service';
import { MatDialog } from '@angular/material/dialog';
import { AjouterModifierFicheComponent } from '../ajouter-modifier-fiche/ajouter-modifier-fiche.component';
import { FichesService } from 'src/app/fiches.service';



@Component({
  selector: 'app-liste-fiches',
  templateUrl: './liste-fiches.component.html',
  styleUrls: ['./liste-fiches.component.css'],
  standalone: true,
  imports:[
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
  ]
})
export class ListeFichesComponent implements OnInit { 
  displayedColumns: string[] = [
  'id',
  'niveau',
  'enseignant',
  'matiere',
  'date',
  'horaire',
  'coursTenu',
  'nomEtudiant',
  'present',
  'action',
];
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;



  constructor(
    private _dialog: MatDialog,
    private _fichesService: FichesService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this._fichesService.listefiches().subscribe(fiches => {
      this.dataSource = new MatTableDataSource(fiches);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  openAjouterModifierFicheForm() {
    const dialogRef = this._dialog.open(AjouterModifierFicheComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._fichesService.listefiches();
        }
      },
    });
  }

  listefiches() {
    this._fichesService.listefiches().subscribe({
      next: (fiches) => {
        this.dataSource = new MatTableDataSource(fiches);
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

  supprimerfiche(id: number) {
    this._fichesService.supprimerfiche(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Fiche supprimee!', 'done');
        this._fichesService.listefiches();
      },
      error: console.log,
    });
  }

  openModifierFicheForm(data: any) {
    const dialogRef = this._dialog.open(AjouterModifierFicheComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._fichesService.listefiches();
        }
      },
    });
  }

}
