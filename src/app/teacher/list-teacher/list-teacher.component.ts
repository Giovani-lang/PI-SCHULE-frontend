import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';
import { TeacherDetailComponent } from '../teacher-detail/teacher-detail.component';
import { DeleteTeacherComponent } from '../delete-teacher/delete-teacher.component';




@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css'],
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
export class ListTeacherComponent implements OnInit {
  displayedColumns: string[] = ['grade', 'nom', 'prenom', 'email', 'genre', 'status', 'actions'];
  dataSource: MatTableDataSource<Teacher>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  teachers: Teacher[] = [];

  constructor(public dialog: MatDialog, public service: TeacherService) {
    this.dataSource = new MatTableDataSource<Teacher>([]);

  }

  ngOnInit(): void {
    this.service.getAllTeachers().subscribe(teachers => {
      this.dataSource = new MatTableDataSource(teachers)
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
    this.dialog.open(AddTeacherComponent, {
      width: '550px',
    }).afterClosed().subscribe((teacher) => {
      if (teacher) {
        this.closeDialog(teacher);
      };
    })
  }

  refresh() {
    this.service.getAllTeachers().subscribe(teachers => {
      this.dataSource = new MatTableDataSource(teachers)
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogEdit(row: any) {
    this.dialog.open(EditTeacherComponent, {
      width: '550px',
      data: row
    }).afterClosed().subscribe((teacher) => {
      if (teacher) {
        this.closeDialog(teacher);
        this.refresh()
      };
    })
  }
  openDialogDetail(row: any) {
    this.dialog.open(TeacherDetailComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((teacher) => {
      if (teacher) {
        this.closeDialog(teacher);
      };
    })
  }

  openDialogDelete(row: any) {
    this.dialog.open(DeleteTeacherComponent, {
      width: '350px',
      data: row
    }).afterClosed().subscribe((teacher) => {
      if (teacher) {
        this.closeDialog(teacher);
        this.refresh()
      };
    })
  }


  closeDialog(teachers: Teacher) {
    this.dataSource.data.push(teachers);
    this.dataSource.data = [...this.dataSource.data];
  }


}
