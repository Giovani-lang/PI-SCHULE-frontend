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
    return this.http.get<Filiere[]>(this.BASE_URL)
  }
  public getFiliere(id: any): Observable<Filiere> {
    return this.http.get<Filiere>(`${this.BASE_URL}/${id}`)
  }
  public addFiliere(filiere: Filiere): Observable<Filiere> {
    return this.http.post<Filiere>(this.BASE_URL, filiere)
  }
  public editFiliere(filiere: Filiere, id: any): Observable<Filiere> {
    return this.http.put<Filiere>(`${this.BASE_URL}/${id}`, filiere)
  }
  public deleteFiliere(id: any): Observable<Filiere> {
    return this.http.delete<Filiere>(`${this.BASE_URL}/${id}`)
  }
}
