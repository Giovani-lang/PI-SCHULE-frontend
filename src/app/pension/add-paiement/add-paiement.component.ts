import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PensionDetailComponent } from '../pension-detail/pension-detail.component';
import { PaiementService } from 'src/app/services/paiement/paiement.service';
import { Historique } from 'src/app/models/historique.model';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.css'],
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
    CommonModule,
    MatSelectModule
  ]
})
export class AddPaiementComponent implements OnInit {
  fomulaireAjout = new FormGroup({
    matricule_etd: new FormControl('', [Validators.required, Validators.required]),
    libelle: new FormControl('', [Validators.required, Validators.required]),
    montant: new FormControl('', [Validators.required, Validators.required]),
    annee_academique: new FormControl('', [Validators.required, Validators.required]),
  })

  annnes: Annee[] = [];

  constructor(
    public dialogRef: MatDialogRef<PensionDetailComponent>,
    private service: PaiementService,
    private message: MatSnackBar,
    private anneeSer: AnneeAcademiqueService,
    @Inject(MAT_DIALOG_DATA) public getData: any,
  ) { }

  ngOnInit(): void {
    this.fomulaireAjout.controls['matricule_etd'].setValue(this.getData)
    this.anneeSer.getAllAnnee().subscribe(annee => this.annnes = annee)
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
