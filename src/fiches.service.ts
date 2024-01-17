import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fiches } from '../models/fiches';
import { HttpClient } from '@angular/common/http';

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

  addFiche(fiches: Fiches): Observable<Fiches> {
    return this.http.post<Fiches>(this.apiUrl, fiches);
  }

  updateFiche(id: number,fiches: Fiches): Observable<Fiches> {
    return this.http.put<Fiches>(`${this.apiUrl}/${fiches.id}`, fiches);
  }

  deleteFiche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



}

