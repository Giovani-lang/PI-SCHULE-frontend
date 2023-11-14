import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASE_URL = 'http://localhost:3000/admin'

  constructor(private http: HttpClient) { }

  public getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.BASE_URL}`)
  }
  public getAdmin(id: any): Observable<Admin> {
    return this.http.get<Admin>(`${this.BASE_URL}/${id}`)
  }
  public deleteAdmin(id: any): Observable<Admin> {
    return this.http.delete<Admin>(`${this.BASE_URL}/${id}`)
  }
  public addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.BASE_URL}`, admin)
  }
  public editAdmin(id: any, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.BASE_URL}/${id}`, admin)
  }
}
