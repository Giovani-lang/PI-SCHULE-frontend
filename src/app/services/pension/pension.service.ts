import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historique } from 'src/app/models/historique.model';
import { Pension } from 'src/app/models/pension.model';

@Injectable({
  providedIn: 'root'
})
export class PensionService {
  BASE_URL = 'http://localhost:3000/pension'

  constructor(private http: HttpClient) { }

  public getAllPension(): Observable<Pension[]> {
    return this.http.get<Pension[]>(`${"http://localhost:8080/api/v1/pensionsScolaire/getAll"}`)
  }
  public getPension(matricule: any): Observable<Pension> {
    return this.http.get<Pension>(`${"http://localhost:8080/api/v1/pensionsScolaire/detail"}/${matricule}`)
  }
  public deletePension(matricule: any): Observable<Pension> {
    return this.http.delete<Pension>(`${"http://localhost:8080/api/v1/pensionsScolaire/edit"}/${matricule}`)
  }
  public addPension(pension: Pension): Observable<Pension> {
    return this.http.post<Pension>(`${"http://localhost:8080/api/v1/pensionsScolaire/add"}`, pension)
  }
  public editPension(matricule: any, pension: Pension): Observable<Pension> {
    return this.http.put<Pension>(`${"http://localhost:8080/api/v1/pensionsScolaire/edit"}/${matricule}`, pension)
  }
}
