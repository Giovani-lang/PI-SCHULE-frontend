import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { User } from 'src/app/models/user.model';
import { StudentService } from 'src/app/services/student/student.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css'],
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
    MatDialogModule
  ]
})
export class PageEditComponent implements OnInit {

  email: string | null;
  student!: Student;
  user!: User;
  hide = true;
  hideConf = true;

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
    firstLogin: new FormControl()
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
    public dialogRef: MatDialogRef<PageEditComponent>,
    private router: Router
  ) {
    this.email = sessionStorage.getItem('email')
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
      this.formulaireModif.controls['firstLogin'].setValue(false);
      if (this.user.role == 'ETUDIANT') {
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
        this.dialogRef.close()
        this.dialogRef.afterClosed().subscribe(() => {
          sessionStorage.setItem("role", user.role.toString())
          if (user.role === 'ADMIN') {
            this.message.open("Connexion réussie", "", { duration: 1500 })
            this.router.navigate(['/dashboard'])
          } else if (user.role === 'ETUDIANT') {
            this.message.open("Connexion réussie", "", { duration: 1500 })
            this.router.navigate([`/lemploi/list/${this.student.classe.nom}`])
          }
        })
      })
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
