import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { StudentService } from 'src/app/services/student/student.service';
import { catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEditComponent } from '../page-edit/page-edit.component';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule
  ]
})

export class PagesLoginComponent implements OnInit {

  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private router: Router,
    private authService: AuthService,
    private message: MatSnackBar,
    private studentService: StudentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.admin = false;
    this.authService.enseignant = false;
    this.authService.etudiant = false;
  }

  onSubmit() {
    if (this.loginForm.status === 'VALID') {
      const logging = this.loginForm.value as unknown as User;
      this.authService.Login(logging.email, logging.password).pipe(
        catchError(error => {
          console.error('Erreur de connexion :', error);
          this.message.open("Email ou mot de passe incorrect, réessayer !!!", "", { duration: 2000 })
          return of(null);
        })
      ).subscribe((res) => {
        if (res) {
          sessionStorage.setItem("email", res.email.toString())
          if (this.dialog.openDialogs.length == 0) {
            if (res.firstLogin === true) {
              this.dialog.open(PageEditComponent)
            } else {
              sessionStorage.setItem("role", res.role.toString())
              if (res.role === 'ADMIN') {
                this.authService.admin = true;
                this.message.open("Connexion réussie", "", { duration: 1500 })
                this.router.navigate(['/dashboard'])
              } if (res.role === 'ETUDIANT') {
                this.authService.etudiant = true;
                this.message.open("Connexion réussie", "", { duration: 1500 })
                this.studentService.getStudentWithEmail(res.email).subscribe((student) => {
                  this.router.navigate([`/lemploi/list/${student.classe.nom}`])
                })
              }
            }
          }
        }
      })
    }
  }
}
