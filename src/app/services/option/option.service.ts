import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filiere } from 'src/app/models/filiere.model';
import { Option } from 'src/app/models/option.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  BASE_URL = "  http://localhost:3000/option"
  constructor(private http: HttpClient) { }

  public getAllOption(): Observable<Option[]> {
    return this.http.get<Option[]>(this.BASE_URL)
  }
  public getOption(id: any): Observable<Option> {
    return this.http.get<Option>(`${this.BASE_URL}/${id}`)
  }
  public addOption(option: Option): Observable<Option> {
    return this.http.post<Option>(this.BASE_URL, option)
  }
  public editOption(option: Option, id: any): Observable<Option> {
    return this.http.put<Option>(`${this.BASE_URL}/${id}`, option)
  }
  public deleteOption(id: any): Observable<Option> {
    return this.http.delete<Option>(`${this.BASE_URL}/${id}`)
  }
}
