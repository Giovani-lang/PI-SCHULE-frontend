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
import { Annee } from 'src/app/models/anneeAcademique.model';
import { Classe } from 'src/app/models/classe.model';
import { ListEmploiDuTempsComponent } from '../list-emploi-du-temps/list-emploi-du-temps.component';
import { EmploiDutempsService } from 'src/app/services/emploiDutemps/emploi-dutemps.service';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { Emploi } from 'src/app/models/emploiDuTemps.model';

@Component({
  selector: 'app-add-emploi-du-temps',
  templateUrl: './add-emploi-du-temps.component.html',
  styleUrls: ['./add-emploi-du-temps.component.css'],
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
export class AddEmploiDuTempsComponent implements OnInit {

  formulaireAjout = new FormGroup({
    annee_academique: new FormControl('', Validators.required),
    semestre: new FormControl('', Validators.required),
    nom_classe: new FormControl('', Validators.required),
  })

  annees: Annee[] = [];
  classes: Classe[] = [];


  constructor(
    public dialogRef: MatDialogRef<ListEmploiDuTempsComponent>,
    private service: EmploiDutempsService,
    private message: MatSnackBar,
    private serviceAnnee: AnneeAcademiqueService,
    private serviceClasse: ClasseService,
  ) { }

  ngOnInit(): void {
    this.serviceAnnee.getAllAnnee().subscribe(annee => this.annees = annee)
    this.serviceClasse.getAllClasse().subscribe(classe => this.classes = classe)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (this.formulaireAjout.status === 'VALID') {
      const emploi = this.formulaireAjout.value as unknown as Emploi;
      this.service.addEmploi(emploi).subscribe((emploi) => {
        this.dialogRef.close(emploi);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
