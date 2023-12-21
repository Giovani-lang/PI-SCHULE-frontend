import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notes } from 'src/app/models/notes';
import { NotesService } from 'src/app/notes.service';
import { AjoutModifNotesComponent } from '../ajout-modif-notes/ajout-modif-notes.component';
import { CoreService } from 'src/app/core.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-liste-des-notes',
  templateUrl: './liste-des-notes.component.html',
  styleUrls: ['./liste-des-notes.component.css'],
  standalone : true,

  imports:[
    MatFormFieldModule,
    MatPaginatorModule,

  ]


})
export class ListeDesNotesComponent implements OnInit{

  notes!: Notes

  displayedColumns: string[] = [
    'id', 
    'Etudiant',
    'niveau', 
    'matiere', 
    'notesCC',
    'notesSN',
    'notesCumulees',
    'enseignant',
    'appreciations',
    'action',
  ];

  dataSource!: MatTableDataSource<Notes>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private notesService: NotesService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,
     private coreService: CoreService) {}

  ngOnInit(): void {

    this.notesService.getListeNotes().subscribe(
      notes => {
      this.dataSource = new MatTableDataSource(notes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAjoutModifNotesForm() {
    const dialogRef = this.dialog.open(AjoutModifNotesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.notesService.getListeNotes();
        }
      },
    });
  }

  getListeNotes() {
    this.notesService.getListeNotes().subscribe({
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

  deleteNotes(id: number) {
    this.notesService.deleteNotes(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Notes supprimées !', 'succès!');
        this.getListeNotes();
      },
      error: console.log,
    });
  }

  openModificationNotesForm(data: any) {
    const dialogRef = this.dialog.open(AjoutModifNotesComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListeNotes();
        }
      },
    });
  }

  }





