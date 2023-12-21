import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core.service';
import { Notes } from 'src/app/models/notes';
import { NotesService } from 'src/app/notes.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-ajout-modif-notes',
  templateUrl: './ajout-modif-notes.component.html',
  styleUrls: ['./ajout-modif-notes.component.css'],
  standalone:true,

  imports:[
    MatPaginatorModule,
    MatDialogModule,
    FormBuilder,
    FormGroup,
    MatPaginator
  ]

})



export class AjoutModifNotesComponent {

  ajoutModifNotesForm: FormGroup;
  notes!: Notes;

  matiere: string[] = [
    'Anglais',
    'Allemand',
    'Commerce International',
    'Droit du Travail',
    'Droit des Obligations',
    'Litterature',
    'Philosophie',
    'Informatique',
    'Physique',
    'Chimie',
    'Mathematiques',
    'EPS',
    'Musique',
    'Dessin'
  ];

 

  constructor(
    private formBuilder: FormBuilder,
    private notesService: NotesService,
    private dialogRef: MatDialogRef<AjoutModifNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
    this.ajoutModifNotesForm = this.formBuilder.group({
      id: 0,
      Etudiant: '', 
      niveau: '', 
      matiere: '', 
      notesCC: 0, 
      notesSN: 0, 
      notesCumulees: 0,
      enseignant:'', 
      appreciations:'' 
    });
  }

  ngOnInit(): void {
    this.ajoutModifNotesForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.ajoutModifNotesForm.valid) {
      if (this.data) {
        this.notesService
          .updateNotes(this.data.id, this.ajoutModifNotesForm.value)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Notes mises à jour/ modifiées!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.notesService.addNotes(this.ajoutModifNotesForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Notes ajoutées !');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

