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
import { ListClasseComponent } from '../list-classe/list-classe.component';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { Classe } from 'src/app/models/classe.model';
import { FiliereService } from 'src/app/services/filiere/filiere.service';
import { OptionService } from 'src/app/services/option/option.service';
import { Option } from 'src/app/models/option.model';
import { Filiere } from 'src/app/models/filiere.model';

@Component({
  selector: 'app-edit-classe',
  templateUrl: './edit-classe.component.html',
  styleUrls: ['./edit-classe.component.css'],
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
export class EditClasseComponent implements OnInit {
  formulaireModif = new FormGroup({
    nom: new FormControl('', Validators.required),
    nom_filiere: new FormControl('', Validators.required),
    nom_option: new FormControl('', Validators.required),
    niveau: new FormControl('', Validators.required),
  })
  filieres: Filiere[] = [];
  options: Option[] = [];





  constructor(
    public dialogRef: MatDialogRef<ListClasseComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private service: ClasseService,
    private message: MatSnackBar,
    private serviceFil: FiliereService,
    private serviceOpt: OptionService
  ) { }

  ngOnInit(): void {
    if (this.editData) {
      this.formulaireModif.controls['nom'].setValue(this.editData.nom)
      this.formulaireModif.controls['nom_filiere'].setValue(this.editData.filiere.nom)
      this.formulaireModif.controls['nom_option'].setValue(this.editData.option.nom)
      this.formulaireModif.controls['niveau'].setValue(this.editData.niveau)
    }
    this.serviceFil.getAllFiliere().subscribe(filiere => this.filieres = filiere);
    this.serviceOpt.getAllOption().subscribe(option => this.options = option);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(): void {
    if (this.formulaireModif.status === 'VALID') {
      const classe = this.formulaireModif.value as unknown as Classe;
      this.service.editClasse(classe, this.editData.nom).subscribe((classe) => {
        this.dialogRef.close(classe);
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
      });
    }
  }


}
