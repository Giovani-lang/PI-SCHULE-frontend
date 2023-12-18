import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from 'src/app/models/option.model';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  // BASE_URL = "  http://localhost:3000/option"
  constructor(private http: HttpClient) { }

  public getAllOption(): Observable<Option[]> {
    return this.http.get<Option[]>("http://localhost:8080/api/v1/options/getAll")
  }
  public addOption(option: Option): Observable<Option> {
    return this.http.post<Option>("http://localhost:8080/api/v1/options/add", option)
  }
  public editOption(option: Option, nom: any): Observable<Option> {
    return this.http.put<Option>(`${"http://localhost:8080/api/v1/options/edit"}/${nom}`, option)
  }
  public deleteOption(nom: any): Observable<Option> {
    return this.http.delete<Option>(`${"http://localhost:8080/api/v1/options/delete"}/${nom}`)
  }
}
