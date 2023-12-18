import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lemploi } from 'src/app/models/lemploi.model';

@Injectable({
  providedIn: 'root'
})
export class LemploiService {

  BASE_URL = 'http://localhost:3000/lemploi'

  constructor(private http: HttpClient) { }

  public getAllByClasse(classe: any): Observable<Lemploi[]> {
    return this.http.get<Lemploi[]>(`${"http://localhost:8080/api/v1/lemploi/detail"}/${classe}`)
  }
  public addL(lemploi: Lemploi): Observable<Lemploi> {
    return this.http.post<Lemploi>(`${"http://localhost:8080/api/v1/lemploi/add"}`, lemploi)
  }
  public editL(lemploi: Lemploi, id: any): Observable<Lemploi> {
    return this.http.put<Lemploi>(`${"http://localhost:8080/api/v1/lemploi/edit"}/${id}`, lemploi)
  }
  public deleteL(id: any): Observable<Lemploi> {
    return this.http.delete<Lemploi>(`${this.BASE_URL}/${id}`)
  }
}
