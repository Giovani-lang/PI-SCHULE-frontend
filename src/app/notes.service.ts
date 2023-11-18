import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notes } from './models/notes';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  listenotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(this.apiUrl);
  }

  affichernotes(id: number): Observable<Notes> {
    return this.http.get<Notes>(`${this.apiUrl}/${id}`);
  }

  ajouterotes(notes: Notes): Observable<Notes> {
    return this.http.post<Notes>(this.apiUrl, notes);
  }

  modifiernotes(notes: Notes): Observable<Notes> {
    return this.http.put<Notes>(`${this.apiUrl}/${notes.id}`, notes);
  }

  supprimernotes(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


