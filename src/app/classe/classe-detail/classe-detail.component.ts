import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import { Student } from 'src/app/models/student.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrls: ['./classe-detail.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class ClasseDetailComponent implements OnInit {

  classe: string | null;

  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'genre', 'actions'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  students: Student[] = [];

  constructor(
    public service: StudentService,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<Student>([]);
    this.classe = this.route.snapshot.paramMap.get("classe")
  }

  ngOnInit(): void {
    this.service.getAllStudentsByClasse(this.classe).subscribe(students => {
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

}
