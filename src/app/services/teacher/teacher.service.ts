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
    return this.http.get<Teacher[]>(`${this.BASE_URL}`)
  }
  public getTeacher(id: any): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.BASE_URL}/${id}`)
  }
  public deleteTeacher(id: any): Observable<Teacher> {
    return this.http.delete<Teacher>(`${this.BASE_URL}/${id}`)
  }
  public addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.BASE_URL}`, teacher)
  }
  public editTeacher(id: any, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.BASE_URL}/${id}`, teacher)
  }
}
