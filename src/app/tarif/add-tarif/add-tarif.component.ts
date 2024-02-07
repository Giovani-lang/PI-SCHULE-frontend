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
import { OptionService } from 'src/app/services/option/option.service';
import { Tarif } from 'src/app/models/tarif.models';
import { TarifService } from 'src/app/services/tarif/tarif.service';
import { ListTarifComponent } from '../list-tarif/list-tarif.component';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-add-tarif',
  templateUrl: './add-tarif.component.html',
  styleUrls: ['./add-tarif.component.css'],
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
export class AddTarifComponent implements OnInit {
  formulaireAjout = new FormGroup({
    option: new FormControl('', Validators.required),
    niveau: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
  })

  options: Option[] = [];


  constructor(
    public dialogRef: MatDialogRef<ListTarifComponent>,
    private service: TarifService,
    private message: MatSnackBar,
    private serviceOpt: OptionService
  ) { }

  ngOnInit(): void {
    this.serviceOpt.getAllOption().subscribe(option => this.options = option);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (this.formulaireAjout.status === 'VALID') {
      const tarif = this.formulaireAjout.value as unknown as Tarif;
      this.service.addTarif(tarif).subscribe((tarif) => {
        this.dialogRef.close(tarif);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }
}
