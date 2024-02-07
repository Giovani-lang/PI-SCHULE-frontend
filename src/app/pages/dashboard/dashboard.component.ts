import { Component, OnInit, ElementRef } from '@angular/core';
import { Classe } from 'src/app/models/classe.model';
import { Pension } from 'src/app/models/pension.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef,
    private service: StudentService,
    private teacherSer: TeacherService,
    private classeSer: ClasseService,
  ) { }

  students: Student[] = [];
  teachers: Teacher[] = [];
  pensions: Pension[] = [];
  classes: Classe[] = [];
  Reg_student!: any;
  ActifTeachers!: any;


  ngOnInit(): void {

    this.service.getAllStudents().subscribe(students => {
      let annee1: number;
      let annee2: number;
      let date = new Date();
      let annee = date.getFullYear();
      let mois = date.getMonth();

      // Si le mois est inférieur à octobre (indexé à partir de 0), soustraire 1 à l'année pour la première variable
      if (mois < 9) {
        annee1 = annee - 1;
        // Ajouter 1 à l'année pour la deuxième variable
        annee2 = annee;

      } else {
        // Sinon, garder l'année actuelle pour la première variable
        annee1 = annee;
        // Ajouter 1 à l'année pour la deuxième variable
        annee2 = annee + 1;

      }

      this.students = students;
      this.Reg_student = students.filter(student => {
        const debut = parseInt(student.anneeAcademique.annees.slice(0, 4), 10)
        const fin = parseInt(student.anneeAcademique.annees.slice(5, 9), 10)
        return annee1 >= debut && annee2 <= fin
      })
    })

    this.teacherSer.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers;
      this.ActifTeachers = teachers.filter(
        teacher => teacher.status === 'Actif'
      )
      console.log(this.ActifTeachers)
    })

    this.classeSer.getAllClasse().subscribe(classe => {
      this.classes = classe
    })

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}

