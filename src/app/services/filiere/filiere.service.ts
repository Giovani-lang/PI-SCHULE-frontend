import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filiere } from 'src/app/models/filiere.model';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  BASE_URL = "  http://localhost:3000/filiere"
  constructor(private http: HttpClient) { }


  public getAllFiliere(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>("http://localhost:8080/api/v1/filieres/getAll")
  }
  public addFiliere(filiere: Filiere): Observable<Filiere> {
    return this.http.post<Filiere>("http://localhost:8080/api/v1/filieres/add", filiere)
  }
  public editFiliere(filiere: Filiere, nom: any): Observable<Filiere> {
    return this.http.put<Filiere>(`${"http://localhost:8080/api/v1/filieres/edit"}/${nom}`, filiere)
  }
  public deleteFiliere(nom: any): Observable<Filiere> {
    return this.http.delete<Filiere>(`${"http://localhost:8080/api/v1/filieres/delete"}/${nom}`)
  }
}
