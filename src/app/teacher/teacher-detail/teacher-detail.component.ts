import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Teacher } from 'src/app/models/teacher.model';
import { ListTeacherComponent } from '../list-teacher/list-teacher.component';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,

  ]
})
export class TeacherDetailComponent implements OnInit {
  teacher!: Teacher;

  constructor(
    public dialogRef: MatDialogRef<ListTeacherComponent>,
    private service: TeacherService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  img = "../assets/img/DefaultImageProfil.png";


  ngOnInit(): void {
    this.service.getTeacher(this.data.id).subscribe(teacher => this.teacher = teacher)
  }

}
