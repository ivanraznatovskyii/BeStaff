import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchByQuery(query: string): Observable<any> {
    console.log('query', query)
    return this.http.post<any[]>(`/api/developers/search`, { SearchString : query });
  }

  searchByParams(query: string): Observable<any> {
    console.log('query', query)
    return this.http.post<any[]>(`/api/developers/search`, query);
  }
}
