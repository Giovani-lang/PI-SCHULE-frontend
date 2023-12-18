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
import { Annee } from 'src/app/models/anneeAcademique.model';
import { Classe } from 'src/app/models/classe.model';
import { ListEmploiDuTempsComponent } from '../list-emploi-du-temps/list-emploi-du-temps.component';
import { EmploiDutempsService } from 'src/app/services/emploiDutemps/emploi-dutemps.service';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { Emploi } from 'src/app/models/emploiDuTemps.model';


@Component({
  selector: 'app-edit-emploi-du-temps',
  templateUrl: './edit-emploi-du-temps.component.html',
  styleUrls: ['./edit-emploi-du-temps.component.css'],
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
export class EditEmploiDuTempsComponent implements OnInit {
  formulaireModif = new FormGroup({
    annee: new FormControl('', Validators.required),
    semestre: new FormControl('', Validators.required),
    classe: new FormControl('', Validators.required),
  })

  annees: Annee[] = [];
  classes: Classe[] = [];

  afficherLignes = false;

  ajouterLigne() {
    this.afficherLignes = true;
  }

  constructor(
    public dialogRef: MatDialogRef<ListEmploiDuTempsComponent>,
    private service: EmploiDutempsService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private message: MatSnackBar,
    private serviceAnnee: AnneeAcademiqueService,
    private serviceClasse: ClasseService,
  ) { }

  edit(): void {
    if (this.formulaireModif.status === 'VALID') {
      const emploi = this.formulaireModif.value as unknown as Emploi;
      this.service.editEmploi(emploi, this.editData.id).subscribe((emploi) => {
        this.dialogRef.close(emploi);
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
      });
    }
  }

  ngOnInit(): void {
    if (this.editData) {
      this.formulaireModif.controls['annee'].setValue(this.editData.annee)
      this.formulaireModif.controls['semestre'].setValue(this.editData.semestre)
      this.formulaireModif.controls['classe'].setValue(this.editData.classe)
    }
    this.serviceAnnee.getAllAnnee().subscribe(annee => this.annees = annee)
    this.serviceClasse.getAllClasse().subscribe(classe => this.classes = classe)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
