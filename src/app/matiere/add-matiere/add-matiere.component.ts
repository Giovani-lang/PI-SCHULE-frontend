import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ListMatiereComponent } from '../list-matiere/list-matiere.component';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { Matiere } from 'src/app/models/matiere.model';
@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css'],
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
export class AddMatiereComponent implements OnInit {

  formulaireAjout = new FormGroup({
    intitule: new FormControl('', Validators.required),
    coefficient: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<ListMatiereComponent>,
    private service: MatiereService,
    private message: MatSnackBar

  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formulaireAjout.status === 'VALID') {
      const matiere = this.formulaireAjout.value as unknown as Matiere;
      this.service.addMatiere(matiere).subscribe((matiere) => {
        this.dialogRef.close(matiere);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
