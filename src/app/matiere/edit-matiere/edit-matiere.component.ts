import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ListMatiereComponent } from '../list-matiere/list-matiere.component';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { Matiere } from 'src/app/models/matiere.model';
@Component({
  selector: 'app-edit-matiere',
  templateUrl: './edit-matiere.component.html',
  styleUrls: ['./edit-matiere.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule
  ]
})
export class EditMatiereComponent implements OnInit {
  formulaireModif = new FormGroup({
    intitule: new FormControl('', Validators.required),
    coefficient: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<ListMatiereComponent>,
    private service: MatiereService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private message: MatSnackBar

  ) { }

  ngOnInit(): void {
    if (this.editData) {
      this.formulaireModif.controls['code'].setValue(this.editData.code);
      this.formulaireModif.controls['intitule'].setValue(this.editData.intitule);
      this.formulaireModif.controls['coefficient'].setValue(this.editData.coefficient);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editMatiere() {
    if (this.formulaireModif.status === 'VALID') {
      this.service.editMatiere(this.formulaireModif.value as unknown as Matiere, this.editData.intitule).subscribe((matiere) => {
        this.dialogRef.close(matiere);
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
