import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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


  ]
})
export class EditStudentComponent implements OnInit {
  formulaireModif = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.required]),
    prenom: new FormControl('', [Validators.required, Validators.required]),
    image_url: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateNaissance: new FormControl(),
    telephone: new FormControl('', [Validators.required, Validators.required]),
    motDePasse: new FormControl('', [Validators.required, Validators.required]),
    niveau: new FormControl('', [Validators.required, Validators.required]),
    filiere: new FormControl('', [Validators.required, Validators.required]),
    genre: new FormControl('', [Validators.required, Validators.required]),
    option: new FormControl('', [Validators.required, Validators.required]),
  })
  fileName: any;

  constructor(
    public dialogRef: MatDialogRef<ListStudentComponent>,
    private service: StudentService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private afs: AngularFireStorage
  ) { }

  hide = true;
  onNoClick(): void {
    this.dialogRef.close();
  }
  id: any;
  ngOnInit(): void {
    if (this.editData) {
      this.formulaireModif.controls['nom'].setValue(this.editData.nom)
      this.formulaireModif.controls['prenom'].setValue(this.editData.prenom)
      this.formulaireModif.controls['image_url'].setValue(this.editData.image_url)
      this.formulaireModif.controls['dateNaissance'].setValue(this.editData.dateNaissance)
      this.formulaireModif.controls['email'].setValue(this.editData.email)
      this.formulaireModif.controls['telephone'].setValue(this.editData.telephone)
      this.formulaireModif.controls['motDePasse'].setValue(this.editData.motDePasse)
      this.formulaireModif.controls['genre'].setValue(this.editData.genre)
      this.formulaireModif.controls['filiere'].setValue(this.editData.filiere)
      this.formulaireModif.controls['option'].setValue(this.editData.option)
      this.formulaireModif.controls['niveau'].setValue(this.editData.niveau)
    }
  }



  async edit() {
    if (this.formulaireModif.status === 'VALID') {
      const student = this.formulaireModif.value as unknown as Student;
      this.service.editStudent(this.editData.id, student).subscribe((student) => {
        this.onSelectField;
        this.dialogRef.close(student);
      });

    }
  }


  // Prévisualisation de l'image et image par defaut

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
