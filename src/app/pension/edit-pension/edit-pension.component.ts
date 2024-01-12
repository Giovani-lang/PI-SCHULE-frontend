import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Pension } from 'src/app/models/pension.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PensionService } from 'src/app/services/pension/pension.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaiementDetailComponent } from '../paiement-detail/paiement-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-pension',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,

  ],
  templateUrl: './edit-pension.component.html',
  styleUrls: ['./edit-pension.component.css']
})
export class EditPensionComponent implements OnInit {
  fomulaireModif = new FormGroup({
    matricule_etd: new FormControl({ value: '', disabled: true }),
    pensionAnnuelle: new FormControl('', [Validators.required, Validators.required]),
    annee_academique: new FormControl('', [Validators.required, Validators.required])
  })

  annees: Annee[] = [];

  constructor(
    public dialogRef: MatDialogRef<PaiementDetailComponent>,
    private service: PensionService,
    private message: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private anneeSer: AnneeAcademiqueService
  ) { }

  ngOnInit(): void {
    this.fomulaireModif.controls['matricule_etd'].patchValue(this.editData.etudiant.matricule);
    this.fomulaireModif.controls['pensionAnnuelle'].setValue(this.editData.pensionAnnuelle);
    this.fomulaireModif.controls['annee_academique'].setValue(this.editData.anneeAcademique.id);
    this.anneeSer.getAllAnnee().subscribe(annee => this.annees = annee);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editPaiement() {
    if (this.fomulaireModif.status === 'VALID') {
      this.service.editPension(this.editData.etudiant.matricule, this.editData.anneeAcademique.id, this.fomulaireModif.value as unknown as Pension).subscribe((paiement) => {
        this.dialogRef.close(paiement);
        this.message.open("Modification effectuée avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
