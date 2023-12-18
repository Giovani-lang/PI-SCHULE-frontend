import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  BASE_URL = 'http://localhost:3000/teacher'

  constructor(private http: HttpClient) { }

  public getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${"http://localhost:8080/api/v1/enseignants/getAll"}`)
  }
  public getTeacher(email: any): Observable<Teacher> {
    return this.http.get<Teacher>(`${"http://localhost:8080/api/v1/enseignants/detail"}/${email}`)
  }
  public deleteTeacher(email: any): Observable<Teacher> {
    return this.http.delete<Teacher>(`${"http://localhost:8080/api/v1/enseignants/delete"}/${email}`)
  }
  public addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${"http://localhost:8080/api/v1/enseignants/add"}`, teacher)
  }
  public editTeacher(email: any, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${"http://localhost:8080/api/v1/enseignants/edit"}/${email}`, teacher)
  }
}
