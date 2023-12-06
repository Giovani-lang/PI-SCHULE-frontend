import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListAnneeAcademiqueComponent } from '../list-annee-academique/list-annee-academique.component';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-annee-academique',
  templateUrl: './edit-annee-academique.component.html',
  styleUrls: ['./edit-annee-academique.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class EditAnneeAcademiqueComponent implements OnInit {

  annee = new FormGroup({
    anneeAcademique: new FormControl('', [Validators.required, Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<ListAnneeAcademiqueComponent>,
    private service: AnneeAcademiqueService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private message: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.editData) {
      this.annee.controls['anneeAcademique'].setValue(this.editData.anneeAcademique)
      console.log(this.editData.id)
    }
  }

  editAnnee() {
    if (this.annee.status === 'VALID') {
      this.service.editAnnee(this.annee.value as unknown as Annee, this.editData.id).subscribe((annee) => {
        this.dialogRef.close(annee);
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
