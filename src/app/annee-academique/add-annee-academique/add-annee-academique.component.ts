import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ListAnneeAcademiqueComponent } from '../list-annee-academique/list-annee-academique.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-annee-academique',
  templateUrl: './add-annee-academique.component.html',
  styleUrls: ['./add-annee-academique.component.css'],
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
export class AddAnneeAcademiqueComponent implements OnInit {

  annee = new FormGroup({
    anneeAcademique: new FormControl('', [Validators.required, Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<ListAnneeAcademiqueComponent>,
    private service: AnneeAcademiqueService,
    private message: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addAnnee() {
    if (this.annee.status === 'VALID') {
      this.service.addAnnee(this.annee.value as unknown as Annee).subscribe((annee) => {
        this.dialogRef.close(annee);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }
}
