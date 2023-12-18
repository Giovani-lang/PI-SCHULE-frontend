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
    return this.http.post<Annee>("http://localhost:8080/api/v1/anneeAcademique/add", annee)
  }
  public editAnnee(annee: Annee, annees: any): Observable<Annee> {
    return this.http.put<Annee>(`${"http://localhost:8080/api/v1/anneeAcademique/edit"}/${annees}`, annee)
  }
  public getAllAnnee(): Observable<Annee[]> {
    return this.http.get<Annee[]>("http://localhost:8080/api/v1/anneeAcademique/getAll")
  }
}
