import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emploi } from 'src/app/models/emploiDuTemps.model';

@Injectable({
  providedIn: 'root'
})
export class EmploiDutempsService {

  BASE_URL = "http://localhost:3000/emploiDuTemps"
  constructor(private http: HttpClient) { }

  public addEmploi(emploi: Emploi): Observable<Emploi> {
    return this.http.post<Emploi>(this.BASE_URL, emploi)
  }
  public editEmploi(emploi: Emploi, id: any): Observable<Emploi> {
    return this.http.put<Emploi>(`${this.BASE_URL}/${id}`, emploi)
  }
  public getAllEmploi(): Observable<Emploi[]> {
    return this.http.get<Emploi[]>(this.BASE_URL)
  }
  public deleteEmploi(id: any): Observable<Emploi> {
    return this.http.delete<Emploi>(`${this.BASE_URL}/${id}`)
  }
}
