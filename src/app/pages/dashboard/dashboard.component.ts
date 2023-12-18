import { Component, OnInit, ElementRef } from '@angular/core';
import { Pension } from 'src/app/models/pension.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { PensionService } from 'src/app/services/pension/pension.service';
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
    private pensionSer: PensionService,
  ) { }

  students: Student[] = [];
  teachers: Teacher[] = [];
  pensions: Pension[] = [];

  pension_ok!: any;
  pension_notOk!: any;

  Reg_student!: any;


  ngOnInit(): void {

    this.service.getAllStudents().subscribe(students => {
      this.students = students;
      this.Reg_student = students.filter(student => {
        const date = student.dateInscription;
        const debut = new Date(new Date().getFullYear(), 10, 1)
        const fin = new Date(new Date().getFullYear() + 1, 7, 30)
        return date >= debut && date <= fin
        console.log(debut)
        console.log(fin)
        console.log(date)
      })
      console.log(this.Reg_student)
    })
    this.teacherSer.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers
    })

    this.pensionSer.getAllPension().subscribe(pensions => {
      this.pension_ok = pensions.filter(pension => (pension.statut === "Soldée")).length;
      this.pension_notOk = pensions.filter(pension => (pension.statut === "En cours")).length;
    })

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}

