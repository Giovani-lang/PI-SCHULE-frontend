import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notes } from './models/notes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/notes';

  constructor(
    private http : HttpClient
    ) { }

  getListeNotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(this.apiUrl);
  }

  getNotes(id: number): Observable<Notes> {
    return this.http.get<Notes>(`${this.apiUrl}/${id}`);
  }

  addNotes(notes: Notes): Observable<Notes> {
    return this.http.post<Notes>(this.apiUrl, notes);
  }

  updateNotes(id: number, notes: Notes): Observable<Notes> {
    return this.http.put<Notes>(`${this.apiUrl}/${notes.id}`, notes);
  }

  deleteNotes(id: number): Observable<Notes> {
    return this.http.delete<Notes>(`${this.apiUrl}/${id}`);
  }
}
