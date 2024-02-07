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
import { OptionService } from 'src/app/services/option/option.service';
import { Option } from 'src/app/models/option.model';
import { Tarif } from 'src/app/models/tarif.models';
import { TarifService } from 'src/app/services/tarif/tarif.service';
import { ListTarifComponent } from '../list-tarif/list-tarif.component';

@Component({
  selector: 'app-edit-tarif',
  templateUrl: './edit-tarif.component.html',
  styleUrls: ['./edit-tarif.component.css'],
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
    MatSnackBarModule,
  ]
})
export class EditTarifComponent implements OnInit {
  formulaireModif = new FormGroup({
    option: new FormControl('', Validators.required),
    niveau: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
  })

  options: Option[] = [];





  constructor(
    public dialogRef: MatDialogRef<ListTarifComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private service: TarifService,
    private message: MatSnackBar,
    private serviceOpt: OptionService
  ) { }

  ngOnInit(): void {
    if (this.editData) {
      this.formulaireModif.controls['option'].setValue(this.editData.options.nom)
      this.formulaireModif.controls['niveau'].setValue(this.editData.niveau)
      this.formulaireModif.controls['montant'].setValue(this.editData.montant)
    }
    this.serviceOpt.getAllOption().subscribe(option => this.options = option);
    console.log(this.editData)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(): void {
    if (this.formulaireModif.status === 'VALID') {
      const tarif = this.formulaireModif.value as unknown as Tarif;
      this.service.editTarif(this.editData.id, tarif).subscribe((tarif) => {
        this.dialogRef.close(tarif);
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
      });
    }
  }


}
