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
import { StudentDetailComponent } from '../student-detail/student-detail.component';

@Component({
  selector: 'app-list-registered-student',
  templateUrl: './list-registered-student.component.html',
  styleUrls: ['./list-registered-student.component.css'],
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
export class ListRegisteredStudentComponent implements OnInit {
  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'genre', 'classe', 'actions'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  students: Student[] = [];

  constructor(public dialog: MatDialog, public service: StudentService) {
    this.dataSource = new MatTableDataSource<Student>([]);

  }

  ngOnInit(): void {
    this.service.getAllStudents().subscribe(students => {
      let annee1: number;
      let annee2: number;
      let date = new Date();
      let annee = date.getFullYear();
      let mois = date.getMonth();

      if (mois < 9) {
        annee1 = annee - 1;
        annee2 = annee;

      } else {
        annee1 = annee;
        annee2 = annee + 1;

      }

      this.dataSource = new MatTableDataSource(students.filter(student => {
        const debut = parseInt(student.anneeAcademique.annees.slice(0, 4), 10)
        const fin = parseInt(student.anneeAcademique.annees.slice(5, 9), 10)
        return annee1 >= debut && annee2 <= fin
      }))
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data, filter) => {
      const result = data.classe.nom.toLowerCase().includes(filter)
        || data.matricule.toLowerCase().includes(filter)
        || data.nom.toLowerCase().includes(filter)
        || data.prenom.toLowerCase().includes(filter)
        || data.genre.toLowerCase().includes(filter)
      return result
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  closeDialog(student: Student) {
    this.dataSource.data.push(student);
    this.dataSource.data = [...this.dataSource.data];
  }

}
