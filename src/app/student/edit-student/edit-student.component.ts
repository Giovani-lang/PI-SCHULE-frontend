import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 } from 'uuid';
import { ListStudentComponent } from '../list-student/list-student.component';
import { StudentService } from 'src/app/services/student/student.service';
import { Student } from 'src/app/models/student.model';
import { CommonModule } from '@angular/common';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    MatSnackBarModule,
    MatCheckboxModule
  ]
})
export class EditStudentComponent implements OnInit {
  formulaireModif = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.required]),
    prenom: new FormControl('', [Validators.required, Validators.required]),
    image_url: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateNaissance: new FormControl('', [Validators.required, Validators.required]),
    telephone: new FormControl('', [Validators.required, Validators.required]),
    password: new FormControl(),
    confirmPassword: new FormControl('', [
      control => control.parent?.get('password')?.value ? Validators.required : null,
    ]),
    nom_classe: new FormControl('', [Validators.required, Validators.required]),
    genre: new FormControl('', [Validators.required, Validators.required]),
    annee_academique: new FormControl('', [Validators.required, Validators.required]),
    dateInscription: new FormControl('', [Validators.required, Validators.required])
  },
    { validators: this.confirmPasswordsMatch }
  )

  annees: Annee[] = [];
  classes: Classe[] = [];


  confirmPasswordsMatch(control: AbstractControl) {
    if (control.get('password')?.value !== null) {
      return control.get('password')?.value === control.get('confirmPassword')?.value
        ? null
        : { mismatch: true };
    } else {
      return null;
    }
  }

  constructor(
    public dialogRef: MatDialogRef<ListStudentComponent>,
    private service: StudentService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private afs: AngularFireStorage,
    private anneeSer: AnneeAcademiqueService,
    private message: MatSnackBar,
    private classeSer: ClasseService,
  ) { }

  hide = true;
  hideConf = true;
  hideInput = false;

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    if (this.editData) {
      this.formulaireModif.controls['nom'].setValue(this.editData.nom)
      this.formulaireModif.controls['prenom'].setValue(this.editData.prenom)
      this.formulaireModif.controls['image_url'].setValue(this.editData.image_url)
      this.formulaireModif.controls['dateNaissance'].setValue(this.editData.dateNaissance)
      this.formulaireModif.controls['email'].setValue(this.editData.email)
      this.formulaireModif.controls['telephone'].setValue(this.editData.telephone)
      this.formulaireModif.controls['genre'].setValue(this.editData.genre)
      this.formulaireModif.controls['nom_classe'].setValue(this.editData.classe.nom)
      this.formulaireModif.controls['annee_academique'].setValue(this.editData.anneeAcademique.annees)
      this.formulaireModif.controls['dateInscription'].setValue(this.editData.dateInscription)
    }
    this.anneeSer.getAllAnnee().subscribe(annees => {
      this.annees = annees
    })
    this.classeSer.getAllClasse().subscribe(classes => {
      this.classes = classes
    })
  }


  async edit() {
    if (this.formulaireModif.status === 'VALID') {
      const student = this.formulaireModif.value as unknown as Student;
      this.service.editStudent(this.editData.matricule, student).subscribe((student) => {
        this.onSelectField;
        this.dialogRef.close(student);
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
      });

    }
  }

  /***********************************************************
    Prévisualisation de l'image et image par defaut
   ********************************************************* */

  url = this.editData.image_url;
  img!: String;
  img0 = "../assets/img/DefaultImageProfil.png";
  async onSelectField(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.img = (e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      if (this.img) {
        const ref = this.afs.ref(`pi-schule/images/${v4()}`);
        // Obtenez l'URL de l'image
        const url = await ref.put(this.img);
        const downloadURL = ref.getDownloadURL();
        downloadURL.subscribe((url) => {
          this.formulaireModif.patchValue({ image_url: url });
        });

      }
    } else if (!e.target.files) { this.img0 }
  }

  // Logique de l'input calendar

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
}
