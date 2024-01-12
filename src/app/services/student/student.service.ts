import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>("http://localhost:8080/api/v1/etudiants/getAll")
  }
  public getStudent(matricule: any): Observable<Student> {
    return this.http.get<Student>(`${"http://localhost:8080/api/v1/etudiants/detail"}/${matricule}`)
  }
  public getStudentWithEmail(email: any): Observable<Student> {
    return this.http.get<Student>(`${"http://localhost:8080/api/v1/etudiants/detailWithEmail"}/${email}`)
  }
  public deleteStudent(matricule: any): Observable<Student> {
    return this.http.delete<Student>(`${"http://localhost:8080/api/v1/etudiants/delete"}/${matricule}`)
  }
  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${"http://localhost:8080/api/v1/etudiants/add"}`, student)
  }
  public editStudent(matricule: any, student: Student): Observable<Student> {
    return this.http.put<Student>(`${"http://localhost:8080/api/v1/etudiants/edit"}/${matricule}`, student)
  }
}
