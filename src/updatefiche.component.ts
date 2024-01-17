import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ListfichesComponent } from '../listfiches/listfiches.component';
import { FichesService } from 'src/app/services/fiches.service';
import { Fiches } from 'src/app/models/fiches';

@Component({
  selector: 'app-updatefiche',
  standalone: true,
  imports: [CommonModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule],
  templateUrl: './updatefiche.component.html',
  styleUrls: ['./updatefiche.component.css']
})
export class UpdateficheComponent implements OnInit {


  fiches!: Fiches;

  matiere: string[] = [
  ];

  session: string[] = [
    'Tenue',
    'Non-tenue'
  ]

  id: any;

  formulaireModifFiche= new FormGroup({
    niveau: new FormControl('',[Validators.required]),
    enseignant: new FormControl('',[Validators.required]),
    matiere: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    horaire: new FormControl('',[Validators.required]),
    session: new FormControl('',[Validators.required]),
    etudiant: new FormControl('',[Validators.required]),
    present: new FormControl('',[Validators.required]),
  })


  constructor(
    public dialogRef: MatDialogRef<ListfichesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fichesService: FichesService,
    private message: MatSnackBar, 
  ) {}

  ngOnInit(): void {
    if(this.data){
      this.formulaireModifFiche.controls.niveau.setValue(this.data.niveau)
      this.formulaireModifFiche.controls.enseignant.setValue(this.data.enseignant)
      this.formulaireModifFiche.controls.matiere.setValue(this.data.matiere)
      this.formulaireModifFiche.controls.date.setValue(this.data.date)
      this.formulaireModifFiche.controls.horaire.setValue(this.data.horaire)
      this.formulaireModifFiche.controls.session.setValue(this.data.session)
      this.formulaireModifFiche.controls.etudiant.setValue(this.data.etudiant)
      this.formulaireModifFiche.controls.present.setValue(this.data.present)
    }
    if(this.data){
      this.formulaireModifFiche.controls.niveau.patchValue(this.data.niveau)
      this.formulaireModifFiche.controls.enseignant.patchValue(this.data.enseignant)
      this.formulaireModifFiche.controls.matiere.patchValue(this.data.matiere)
      this.formulaireModifFiche.controls.date.patchValue(this.data.date)
      this.formulaireModifFiche.controls.horaire.patchValue(this.data.horaire)
      this.formulaireModifFiche.controls.session.patchValue(this.data.session)
      this.formulaireModifFiche.controls.etudiant.patchValue(this.data.etudiant)
      this.formulaireModifFiche.controls.present.patchValue(this.data.present)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async updatefiche(){
    if(this.formulaireModifFiche.status=== 'VALID'){
      this.fiches = this.formulaireModifFiche.value as unknown as Fiches;
      this.fichesService.updateFiche(this.id, this.fiches).subscribe((fiches) =>
      {
        this.dialogRef.close(fiches);
        this.message.open("fiche modifiée !","Succès", {duration: 2000})
      })                       
    }
  }
}
