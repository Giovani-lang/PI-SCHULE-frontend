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
    return this.http.get<Matiere[]>(this.BASE_URL)
  }
  public getMatiere(id: any): Observable<Matiere> {
    return this.http.get<Matiere>(`${this.BASE_URL}/${id}`)
  }
  public addMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(this.BASE_URL, matiere)
  }
  public editMatiere(matiere: Matiere, id: any): Observable<Matiere> {
    return this.http.put<Matiere>(`${this.BASE_URL}/${id}`, matiere)
  }
  public deleteMatiere(id: any): Observable<Matiere> {
    return this.http.delete<Matiere>(`${this.BASE_URL}/${id}`)
  }
}
