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
  selector: 'app-add-lemploi',
  templateUrl: './add-lemploi.component.html',
  styleUrls: ['./add-lemploi.component.css'],
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
export class AddLemploiComponent implements OnInit {
  formulaireAjout = new FormGroup({
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
  ) { }

  ngOnInit(): void {
    this.serviceTec.getAllTeachers().subscribe(teacher => this.teachers = teacher);
    this.serviceMat.getAllMatiere().subscribe(matiere => this.matieres = matiere);
    this.serviceCla.getAllClasse().subscribe(classe => this.classes = classe);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (this.formulaireAjout.status === 'VALID') {
      const Lemploi = this.formulaireAjout.value as unknown as Lemploi;
      this.service.addL(Lemploi).subscribe((lemploi) => {
        this.dialogRef.close(lemploi);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }
}
