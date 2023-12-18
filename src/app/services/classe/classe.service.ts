import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from 'src/app/models/classe.model';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  BASE_URL = " http://localhost:3000/classe"
  constructor(private http: HttpClient) { }

  public getAllClasse(): Observable<Classe[]> {
    return this.http.get<Classe[]>("http://localhost:8080/api/v1/classes/getAll")
  }
  public addClasse(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>("http://localhost:8080/api/v1/classes/add", classe)
  }
  public editClasse(classe: Classe, nom: any): Observable<Classe> {
    return this.http.put<Classe>(`${"http://localhost:8080/api/v1/classes/edit"}/${nom}`, classe)
  }
  public deleteClasse(id: any): Observable<Classe> {
    return this.http.delete<Classe>(`${"http://localhost:8080/api/v1/classes/delete"}/${id}`)
  }
}
