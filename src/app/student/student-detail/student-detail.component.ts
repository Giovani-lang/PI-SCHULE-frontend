import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student/student.service';
import { MatCardModule } from '@angular/material/card';
// import { NgxPrintModule } from 'ngx-print';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    // NgxPrintModule,
    MatProgressBarModule
  ]

})
export class StudentDetailComponent implements OnInit {

  student!: Student;
  constructor(private service: StudentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.service.getStudent(id).subscribe(student => {
      this.student = student
      this.image_url = student.image_url
    })
  }

  image_url: any;
  img0 = "../assets/img/DefaultImageProfil.png";
  onSelectField(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.image_url = event.target.result;
      }
    } else if (!e.target.files) { this.img0 }
  }

  getFormattedDate(): string {
    return formatDate(this.student.dateNaissance, 'dd/MM/yyyy', 'en-US');
  }
}
