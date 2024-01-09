import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = "http://localhost:8080/api/v1/auth/login";
  isLogin = false;
  admin = false;
  enseignant = false;
  etudiant = false;
  constructor(private http: HttpClient) { }

  public Login(email: String, password: String): Observable<User> {
    return this.http.post<User>(this.BASE_URL, { email, password })
  }

}
