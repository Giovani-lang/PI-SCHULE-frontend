import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annee } from 'src/app/models/anneeAcademique.model';

@Injectable({
  providedIn: 'root'
})
export class AnneeAcademiqueService {

  BASE_URL = "  http://localhost:3000/anneeAcademique"
  constructor(private http: HttpClient) { }

  public addAnnee(annee: Annee): Observable<Annee> {
    return this.http.post<Annee>(this.BASE_URL, annee)
  }
  public editAnnee(annee: Annee, id: any): Observable<Annee> {
    return this.http.put<Annee>(`${this.BASE_URL}/${id}`, annee)
  }
  public getAllAnnee(): Observable<Annee[]> {
    return this.http.get<Annee[]>(this.BASE_URL)
  }
}
