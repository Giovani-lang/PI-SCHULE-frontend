import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-add-filiere',
  templateUrl: './add-filiere.component.html',
  styleUrls: ['./add-filiere.component.css'],
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
export class AddFiliereComponent implements OnInit {
  fomulaireAjout = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<ListFiliereComponent>,
    private service: FiliereService,
    private message: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addFiliere() {
    if (this.fomulaireAjout.status === 'VALID') {
      this.service.addFiliere(this.fomulaireAjout.value as unknown as Filiere).subscribe((filiere) => {
        this.dialogRef.close(filiere);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
