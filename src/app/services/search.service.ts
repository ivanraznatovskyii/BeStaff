import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchByParams(body: FormData): Observable<any> {
    //console.log('Body', body)
    return this.http.post<any[]>(`/api/developers/search`, body);
  }

}
