import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PensionDetailComponent } from '../pension-detail/pension-detail.component';
import { PaiementService } from 'src/app/services/paiement/paiement.service';
import { Historique } from 'src/app/models/historique.model';

@Component({
  selector: 'app-add-pension',
  templateUrl: './add-pension.component.html',
  styleUrls: ['./add-pension.component.css'],
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
export class AddPensionComponent implements OnInit {
  fomulaireAjout = new FormGroup({
    matricule_etd: new FormControl('', Validators.required),
    libelle: new FormControl('', [Validators.required, Validators.required]),
    montant: new FormControl('', [Validators.required, Validators.required])
  })

  constructor(
    public dialogRef: MatDialogRef<PensionDetailComponent>,
    private service: PaiementService,
    private message: MatSnackBar,

  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPaiement() {
    if (this.fomulaireAjout.status === 'VALID') {
      this.service.addPaiement(this.fomulaireAjout.value as unknown as Historique).subscribe((paiement) => {
        console.log(paiement)
        this.dialogRef.close(paiement);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
