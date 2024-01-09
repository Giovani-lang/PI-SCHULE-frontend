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

  ],
  templateUrl: './edit-pension.component.html',
  styleUrls: ['./edit-pension.component.css']
})
export class EditPensionComponent implements OnInit {
  fomulaireModif = new FormGroup({
    matricule_etd: new FormControl({ value: '', disabled: true }),
    pensionAnnuelle: new FormControl('', [Validators.required, Validators.required])
  })

  constructor(
    public dialogRef: MatDialogRef<PaiementDetailComponent>,
    private service: PensionService,
    private message: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    const data = this.service.getPension(this.editData).subscribe((pension) => {
      this.fomulaireModif.controls['matricule_etd'].patchValue(pension.etudiant.matricule.toString())
      this.fomulaireModif.controls['pensionAnnuelle'].setValue(pension.pensionAnnuelle.toString())
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editPaiement() {
    if (this.fomulaireModif.status === 'VALID') {
      this.service.editPension(this.editData, this.fomulaireModif.value as unknown as Pension).subscribe((paiement) => {
        console.log(paiement)
        this.dialogRef.close(paiement);
        this.message.open("Modification effectuée avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
