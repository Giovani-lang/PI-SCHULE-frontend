import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CoreService } from 'src/app/core.service';
import { FichesService } from 'src/app/fiches.service';
import { Fiches } from 'src/app/models/fiches';


@Component({
  selector: 'app-ajout-modif-fiches',
  templateUrl: './ajout-modif-fiches.component.html',
  styleUrls: ['./ajout-modif-fiches.component.css'],
  standalone: true,

  imports:[
    
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
  ]
})
export class AjoutModifFichesComponent {

  ajoutModifFichesForm: FormGroup;
  fiches!: Fiches;

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

  session: string[] = [
    'Tenue',
    'Non-tenue'
  ]


  constructor(
    private formBuilder: FormBuilder,
    private fichesService: FichesService,
    private dialogRef: MatDialogRef<AjoutModifFichesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
    this.ajoutModifFichesForm = this.formBuilder.group({
      id: 0,
      niveau: '', 
      enseignant:'',
      matiere: '',
      date:'', 
      horaire:'',
      coursTenu:'',
      etudiant:'',
      present:'', 
    });
  }

  ngOnInit(): void {
    this.ajoutModifFichesForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.ajoutModifFichesForm.valid) {
      if (this.data) {
        this.fichesService
          .updateFiche(this.data.id, this.ajoutModifFichesForm.value)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Fiche de présence mise à jour/ modifiée!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.fichesService.addFiche(this.ajoutModifFichesForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Fiche de présence ajoutée !');
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

