import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { User } from 'src/app/models/user.model';
import { StudentService } from 'src/app/services/student/student.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule,
    RouterModule
  ]
})
export class UsersProfileComponent implements OnInit {

  email: string | null;
  role: string | null;
  user!: User;
  student!: Student;
  hide = true;
  hideConf = true;
  img = "../../assets/img/DefaultImageProfil.png";

  formulaireModif = new FormGroup({
    image_url: new FormControl(),
    nom: new FormControl(),
    prenom: new FormControl(),
    genre: new FormControl(),
    role: new FormControl(),
    telephone: new FormControl(),
    email: new FormControl(),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  },
    { validators: this.confirmPasswordsMatch }
  )

  confirmPasswordsMatch(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  constructor(
    private serviceUser: UserService,
    private serviceEtd: StudentService,
    private message: MatSnackBar,
  ) {
    this.email = sessionStorage.getItem('email')
    this.role = sessionStorage.getItem('role')
  }

  ngOnInit(): void {
    this.serviceUser.getUserByEmail(this.email).subscribe((user) => {
      this.user = user
      this.formulaireModif.controls['nom'].setValue(user.nom);
      this.formulaireModif.controls['prenom'].setValue(user.prenom);
      this.formulaireModif.controls['email'].setValue(user.email);
      this.formulaireModif.controls['telephone'].setValue(user.telephone);
      this.formulaireModif.controls['genre'].setValue(user.genre);
      this.formulaireModif.controls['role'].setValue(user.role);
      this.formulaireModif.controls['image_url'].setValue(user.image_url);
      if (this.role == 'ETUDIANT') {
        this.serviceEtd.getStudentWithEmail(this.email).subscribe((student) => this.student = student)
      }
    })
  }

  edit() {
    if (this.formulaireModif.status === 'VALID') {
      const user = this.formulaireModif.value as unknown as User
      this.serviceUser.editUser(this.email, user).subscribe((user) => {
        this.user = user;
        this.message.open("Modifié avec succès !!!", "", { duration: 1500 })
        this.formulaireModif.reset()
      })
    }
  }

}
