import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pension } from 'src/app/models/pension.model';

@Injectable({
  providedIn: 'root'
})
export class PensionService {
  BASE_URL = 'http://localhost:3000/pension'

  constructor(private http: HttpClient) { }

  public getAllPension(): Observable<Pension[]> {
    return this.http.get<Pension[]>(`${this.BASE_URL}`)
  }
  public getPension(id: any): Observable<Pension> {
    return this.http.get<Pension>(`${this.BASE_URL}/${id}`)
  }
  public deletePension(id: any): Observable<Pension> {
    return this.http.delete<Pension>(`${this.BASE_URL}/${id}`)
  }
  public addPension(pension: Pension): Observable<Pension> {
    return this.http.post<Pension>(`${this.BASE_URL}`, pension)
  }
  public editPension(id: any, pension: Pension): Observable<Pension> {
    return this.http.put<Pension>(`${this.BASE_URL}/${id}`, pension)
  }
}
