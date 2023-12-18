import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from 'src/app/models/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  BASE_URL = " http://localhost:3000/matiere"
  constructor(private http: HttpClient) { }

  public getAllMatiere(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>("http://localhost:8080/api/v1/matieres/getAll")
  }
  public addMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>("http://localhost:8080/api/v1/matieres/add", matiere)
  }
  public editMatiere(matiere: Matiere, intitule: any): Observable<Matiere> {
    return this.http.put<Matiere>(`${"http://localhost:8080/api/v1/matieres/edit"}/${intitule}`, matiere)
  }
  public deleteMatiere(intitule: any): Observable<Matiere> {
    return this.http.delete<Matiere>(`${"http://localhost:8080/api/v1/matieres/delete"}/${intitule}`)
  }
}
