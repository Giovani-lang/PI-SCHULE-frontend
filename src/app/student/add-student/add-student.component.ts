import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { ListStudentComponent } from '../list-student/list-student.component';
import { StudentService } from 'src/app/services/student/student.service';
import { Student } from 'src/app/models/student.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 } from 'uuid';
import { Annee } from 'src/app/models/anneeAcademique.model';
import { AnneeAcademiqueService } from 'src/app/services/anneeAcademique/annee-academique.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
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
    MatSnackBarModule
  ]
})
export class AddStudentComponent implements OnInit {
  formulaireAjout = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.required]),
    prenom: new FormControl('', [Validators.required, Validators.required]),
    image_url: new FormControl(),
    dateNaissance: new FormControl('', [Validators.required, Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.required]),
    motDePasse: new FormControl('', [Validators.required, Validators.required]),
    confirmPassword: new FormControl('', [Validators.required, Validators.required]),
    niveau: new FormControl('', [Validators.required, Validators.required]),
    filiere: new FormControl('', [Validators.required, Validators.required]),
    genre: new FormControl('', [Validators.required, Validators.required]),
    option: new FormControl('', [Validators.required, Validators.required]),
    annee: new FormControl('', [Validators.required, Validators.required]),
    inscription: new FormControl('', [Validators.required, Validators.required]),
  },
    { validators: this.confirmPasswordsMatch }
  )

  annees: Annee[] = [];


  confirmPasswordsMatch(control: AbstractControl) {
    return control.get('motDePasse')?.value === control.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
  constructor(
    public dialogRef: MatDialogRef<ListStudentComponent>,
    private service: StudentService,
    private afs: AngularFireStorage,
    private anneeSer: AnneeAcademiqueService,
    private message: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.anneeSer.getAllAnnee().subscribe(data => this.annees = data)
  }

  hide = true;
  hideConf = true;

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (this.formulaireAjout.status === 'VALID') {
      const student = this.formulaireAjout.value as unknown as Student;
      this.service.addStudent(student).subscribe((student) => {
        this.onSelectField;
        this.dialogRef.close(student);
        this.message.open("Enregistré avec succès !!!", "", { duration: 1500 })
      });
    }
  }


  /*******************************************************************
          #Prévisualisation de l'image et image par defaut
   *******************************************************************/

  url = "../assets/img/DefaultImageProfil.png";
  img!: String;
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
          this.formulaireAjout.patchValue({ image_url: url })
        });

      }
    } else if (!e.target.files) { this.url }
  }


  /*********************************************************************
                      #Logique de l'input calendar
   *********************************************************************/

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
