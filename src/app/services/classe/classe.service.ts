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
    return this.http.get<Classe[]>(this.BASE_URL)
  }
  public getClasse(id: any): Observable<Classe> {
    return this.http.get<Classe>(`${this.BASE_URL}/${id}`)
  }
  public addClasse(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(this.BASE_URL, classe)
  }
  public editClasse(classe: Classe, id: any): Observable<Classe> {
    return this.http.put<Classe>(`${this.BASE_URL}/${id}`, classe)
  }
  public deleteClasse(id: any): Observable<Classe> {
    return this.http.delete<Classe>(`${this.BASE_URL}/${id}`)
  }
}
