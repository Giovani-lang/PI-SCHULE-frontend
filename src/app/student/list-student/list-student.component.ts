import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { Student } from 'src/app/models/student.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { DeleteStudentComponent } from '../delete-student/delete-student.component';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import { EditPensionComponent } from 'src/app/pension/edit-pension/edit-pension.component';



@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule
  ]
})
export class ListStudentComponent implements OnInit {
  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'genre', 'classe', 'actions'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  students: Student[] = [];

  constructor(public dialog: MatDialog, public service: StudentService) {
    this.dataSource = new MatTableDataSource<Student>([]);

  }

  ngOnInit(): void {
    this.service.getAllStudents().subscribe(students => {
      this.dataSource = new MatTableDataSource(students)
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogAdd(): void {
    this.dialog.open(AddStudentComponent, {
      width: '550px',
    }).afterClosed().subscribe((students) => {
      if (students) {
        this.closeDialog(students);
      };
    })
  }

  refresh() {
    this.service.getAllStudents().subscribe(student => {
      this.dataSource = new MatTableDataSource(student)
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogDetail(row: any) {
    this.dialog.open(StudentDetailComponent, {
      width: '600px',
      data: row
    }).afterClosed().subscribe((students) => {
      if (students) {
        this.closeDialog(students);
      };
    })
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditStudentComponent, {
      width: '550px',
      data: row
    }).afterClosed().subscribe((students) => {
      if (students) {
        this.closeDialog(students);
        this.refresh()
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteStudentComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((students) => {
      if (students) {
        this.closeDialog(students);
        this.refresh()
      };
    })
  }

  closeDialog(student: Student) {
    this.dataSource.data.push(student);
    this.dataSource.data = [...this.dataSource.data];
  }

}
