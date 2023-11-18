import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fiches } from './models/fiches';

@Injectable({
  providedIn: 'root'
})
export class FichesService {

  private apiUrl = 'http://localhost:3000/fiches';

  constructor(private http: HttpClient) {}

  listefiches(): Observable<Fiches[]> {
    return this.http.get<Fiches[]>(this.apiUrl);
  }

  afficherfiche(id: number): Observable<Fiches> {
    return this.http.get<Fiches>(`${this.apiUrl}/${id}`);
  }

  ajouterfiche(fiche: Fiches): Observable<Fiches> {
    return this.http.post<Fiches>(this.apiUrl, fiche);
  }

  modifierfiche(id: number,fiche: Fiches): Observable<Fiches> {
    return this.http.put<Fiches>(`${this.apiUrl}/${fiche.id}`, fiche);
  }

  supprimerfiche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}



