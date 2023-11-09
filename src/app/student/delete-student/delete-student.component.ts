import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ListStudentComponent } from '../list-student/list-student.component';
import { StudentService } from 'src/app/services/student/student.service';
@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ]
})
export class DeleteStudentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListStudentComponent>,
    private service: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {

  }

  delete() {
    return this.service.deleteStudent(this.data.id).subscribe(student => {
      this.ngOnInit();
      this.dialogRef.close(student);
    })
  }
}
