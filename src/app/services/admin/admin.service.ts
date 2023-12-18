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
    return this.http.get<Admin[]>(`${"http://localhost:8080/api/v1/administrations/getAll"}`)
  }
  public getAdmin(email: any): Observable<Admin> {
    return this.http.get<Admin>(`${"http://localhost:8080/api/v1/administrations/detail"}/${email}`)
  }
  public deleteAdmin(email: any): Observable<Admin> {
    return this.http.delete<Admin>(`${"http://localhost:8080/api/v1/administrations/delete"}/${email}`)
  }
  public addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${"http://localhost:8080/api/v1/administrations/add"}`, admin)
  }
  public editAdmin(email: any, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${"http://localhost:8080/api/v1/administrations/edit"}/${email}`, admin)
  }
}
