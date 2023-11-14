import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 } from 'uuid';
import { Teacher } from 'src/app/models/teacher.model';
import { ListTeacherComponent } from '../list-teacher/list-teacher.component';
import { TeacherService } from 'src/app/services/teacher/teacher.service';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
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
    CommonModule
  ]
})
export class AddTeacherComponent {
  formulaireAjout = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.required]),
    prenom: new FormControl('', [Validators.required, Validators.required]),
    image_url: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.required]),
    genre: new FormControl('', [Validators.required, Validators.required]),
    discipline: new FormControl('', [Validators.required, Validators.required]),
  })

  fileName: any;

  constructor(
    public dialogRef: MatDialogRef<ListTeacherComponent>,
    private service: TeacherService,
    private afs: AngularFireStorage
  ) { }
  hide = true;
  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    if (this.formulaireAjout.status === 'VALID') {
      const teacher = this.formulaireAjout.value as unknown as Teacher;
      this.service.addTeacher(teacher).subscribe((teacher) => {
        this.onSelectField;
        this.dialogRef.close(teacher);
      });
    }
  }


  // Prévisualisation de l'image et image par defaut

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
