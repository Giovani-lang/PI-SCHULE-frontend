import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ListTeacherComponent } from '../list-teacher/list-teacher.component';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-teacher',
  templateUrl: './delete-teacher.component.html',
  styleUrls: ['./delete-teacher.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class DeleteTeacherComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListTeacherComponent>,
    private service: TeacherService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private message: MatSnackBar
  ) { }
  ngOnInit(): void {

  }

  delete() {
    return this.service.deleteTeacher(this.data.id).subscribe(teacher => {
      this.ngOnInit();
      this.dialogRef.close(teacher);
      this.message.open("Supprimé avec succès !!!", "", { duration: 1500 })
    })
  }

}
