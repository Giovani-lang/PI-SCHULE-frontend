import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  student!: Student;
  role = sessionStorage.getItem('role');

  constructor(
    private serviceEtd: StudentService,
  ) {

  }

  ngOnInit(): void {
    const email = sessionStorage.getItem("email")
    const role = sessionStorage.getItem("role")
    if (role == "ETUDIANT") {
      this.serviceEtd.getStudentWithEmail(email).subscribe(student => this.student = student)
    }
  }

}
