import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarif } from 'src/app/models/tarif.models';

@Injectable({
  providedIn: 'root'
})
export class TarifService {

  constructor(private http: HttpClient) { }

  public addTarif(tarif: Tarif): Observable<Tarif> {
    return this.http.post<Tarif>("http://localhost:8080/api/v1/tarifs/add", tarif)
  }
  public editTarif(id: any, tarif: Tarif): Observable<Tarif> {
    return this.http.put<Tarif>(`${"http://localhost:8080/api/v1/tarifs/edit"}/${id}`, tarif)
  }
  public getAllTarifs(): Observable<Tarif[]> {
    return this.http.get<Tarif[]>("http://localhost:8080/api/v1/tarifs/all")
  }
}
