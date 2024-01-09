import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student/student.service';
import { MatCardModule } from '@angular/material/card';
import { NgxPrintModule } from 'ngx-print';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ListStudentComponent } from '../list-student/list-student.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    NgxPrintModule,
    MatProgressBarModule
  ]

})
export class StudentDetailComponent implements OnInit {

  student!: Student;
  constructor(
    public dialogRef: MatDialogRef<ListStudentComponent>,
    private service: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  img = "../assets/img/DefaultImageProfil.png";

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }


  ngOnInit(): void {
    this.service.getStudent(this.data.matricule).subscribe(student => {
      this.student = student
      student.dateNaissance = this.convertDate(student.dateNaissance)
    })
  }
}
