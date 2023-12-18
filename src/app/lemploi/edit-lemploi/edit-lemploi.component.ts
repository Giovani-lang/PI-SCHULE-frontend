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
import { ListLemploiComponent } from '../list-lemploi/list-lemploi.component';
import { Teacher } from 'src/app/models/teacher.model';
import { Matiere } from 'src/app/models/matiere.model';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { LemploiService } from 'src/app/services/lemploi/lemploi.service';
import { Lemploi } from 'src/app/models/lemploi.model';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe/classe.service';
@Component({
  selector: 'app-edit-lemploi',
  templateUrl: './edit-lemploi.component.html',
  styleUrls: ['./edit-lemploi.component.css'],
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
export class EditLemploiComponent implements OnInit {
  formulaireModif = new FormGroup({
    nom_classe: new FormControl('', Validators.required),
    jour: new FormControl('', Validators.required),
    debut: new FormControl('', Validators.required),
    duree: new FormControl('', Validators.required),
    cours: new FormControl('', Validators.required),
    email_enseignant: new FormControl('', Validators.required),
  })

  teachers: Teacher[] = [];
  matieres: Matiere[] = [];
  classes: Classe[] = [];


  constructor(
    public dialogRef: MatDialogRef<ListLemploiComponent>,
    private service: LemploiService,
    private message: MatSnackBar,
    private serviceTec: TeacherService,
    private serviceMat: MatiereService,
    private serviceCla: ClasseService,
    @Inject(MAT_DIALOG_DATA) public editData: any,

  ) { }

  ngOnInit(): void {
    if (this.editData) {
      this.formulaireModif.controls['nom_classe'].patchValue(this.editData.classe.nom)
      this.formulaireModif.controls['jour'].patchValue(this.editData.jour)
      this.formulaireModif.controls['debut'].patchValue(this.editData.debut)
      this.formulaireModif.controls['duree'].patchValue(this.editData.duree)
      this.formulaireModif.controls['cours'].patchValue(this.editData.matiere.intitule)
      this.formulaireModif.controls['email_enseignant'].patchValue(this.editData.enseignant.email)
    }
    console.log(this.editData)
    this.serviceTec.getAllTeachers().subscribe(teacher => this.teachers = teacher);
    this.serviceMat.getAllMatiere().subscribe(matiere => this.matieres = matiere);
    this.serviceCla.getAllClasse().subscribe(classe => this.classes = classe);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  edit(): void {
    if (this.formulaireModif.status === 'VALID') {
      const Lemploi = this.formulaireModif.value as unknown as Lemploi;
      this.service.editL(Lemploi, this.editData.id).subscribe((lemploi) => {
        this.dialogRef.close(lemploi);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }

}
