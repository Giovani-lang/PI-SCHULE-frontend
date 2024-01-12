import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  public getUserByEmail(email: any): Observable<User> {
    return this.http.get<User>(`${"http://localhost:8080/api/v1/users"}/${email}`)
  }
  public editUser(email: any, user: User): Observable<User> {
    return this.http.put<User>(`${"http://localhost:8080/api/v1/users"}/${email}`, user)
  }
}
