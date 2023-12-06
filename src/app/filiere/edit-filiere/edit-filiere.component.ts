import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ListFiliereComponent } from '../list-filiere/list-filiere.component';
import { FiliereService } from 'src/app/services/filiere/filiere.service';
import { Filiere } from 'src/app/models/filiere.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-filiere',
  templateUrl: './edit-filiere.component.html',
  styleUrls: ['./edit-filiere.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class EditFiliereComponent implements OnInit {
  fomulaireModif = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<ListFiliereComponent>,
    private service: FiliereService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private message: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.editData) {
      this.fomulaireModif.controls['nom'].setValue(this.editData.nom)
    }
  }

  editFiliere() {
    if (this.fomulaireModif.status === 'VALID') {
      this.service.editFiliere(this.fomulaireModif.value as unknown as Filiere, this.editData.id).subscribe((filiere) => {
        this.dialogRef.close(filiere);
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
      });
    }
  }
}
