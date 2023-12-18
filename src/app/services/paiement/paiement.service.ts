import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historique } from 'src/app/models/historique.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http: HttpClient) { }

  public getPaiement(matricule: any): Observable<Historique[]> {
    return this.http.get<Historique[]>(`${"http://localhost:8080/api/v1/paiements/detail"}/${matricule}`)
  }
  public addPaiement(paiement: Historique): Observable<Historique> {
    return this.http.post<Historique>(`${"http://localhost:8080/api/v1/paiements/add"}`, paiement)
  }
}
