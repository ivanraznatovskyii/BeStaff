import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  searchByParams(body: Object): Observable<any> {
    //console.log('Body', body)
    const props = new FormData();
    for(let item in body) {
      props.append(item, body[item]);
    }
    return this.http.post<any[]>(`/api/developers/search`, props);
=======
  searchByParams(body: FormData): Observable<any> {
    //console.log('Body', body)
    return this.http.post<any[]>(`/api/developers/search`, body);
>>>>>>> without_proxy_server
  }

}
