import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  BASE_URL = 'http://localhost:3000/student'

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.BASE_URL}`)
  }
  public getStudent(id: any): Observable<Student> {
    return this.http.get<Student>(`${this.BASE_URL}/${id}`)
  }
  public deleteStudent(id: any): Observable<Student> {
    return this.http.delete<Student>(`${this.BASE_URL}/${id}`)
  }
  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.BASE_URL}`, student)
  }
  public editStudent(id: any, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.BASE_URL}/${id}`, student)
  }
}
