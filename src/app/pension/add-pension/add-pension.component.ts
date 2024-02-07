import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ListPensionComponent } from '../list-pension/list-pension.component';
import { PensionService } from 'src/app/services/pension/pension.service';
import { Pension } from 'src/app/models/pension.model';
import { MatSelectModule } from '@angular/material/select';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { CommonModule } from '@angular/common';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student/student.service';

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
    MatSelectModule,
    CommonModule
  ]
})
export class AddPensionComponent implements OnInit {
  fomulaireAjout = new FormGroup({
    matricule_etd: new FormControl('', Validators.required),
    annee_academique: new FormControl('', [Validators.required, Validators.required])
  })

  annees: Annee[] = [];
  students: Student[] = [];

  constructor(
    public dialogRef: MatDialogRef<ListPensionComponent>,
    private service: PensionService,
    private message: MatSnackBar,
    private anneeSer: AnneeAcademiqueService,
    private studentSer: StudentService
  ) { }

  ngOnInit(): void {
    this.anneeSer.getAllAnnee().subscribe(annee => this.annees = annee)
    this.studentSer.getAllStudents().subscribe(student => this.students = student)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPaiement() {
    if (this.fomulaireAjout.status === 'VALID') {
      this.service.addPension(this.fomulaireAjout.value as unknown as Pension).subscribe((paiement) => {
        console.log(paiement)
        this.dialogRef.close(paiement);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }
}