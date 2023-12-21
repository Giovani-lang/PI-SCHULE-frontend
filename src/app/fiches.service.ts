import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fiches } from './models/fiches';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FichesService {
  private apiUrl = 'http://localhost:3000/fiches';

  constructor(private http: HttpClient) { }

  getListeFiches(): Observable<Fiches[]> {
    return this.http.get<Fiches[]>(this.apiUrl);
  }

  getFiche(id: number): Observable<Fiches> {
    return this.http.get<Fiches>(`${this.apiUrl}/${id}`);
  }

  addFiche(fiche: Fiches): Observable<Fiches> {
    return this.http.post<Fiches>(this.apiUrl, fiche);
  }

  updateFiche(id: number,fiche: Fiches): Observable<Fiches> {
    return this.http.put<Fiches>(`${this.apiUrl}/${fiche.id}`, fiche);
  }

  deleteFiche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
