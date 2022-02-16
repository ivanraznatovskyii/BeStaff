import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Developer } from '../interfaces/developer';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<any> {
    return this.http.get<any[]>(`/api/developers/stacks`);
  }

  getAllDevs(): Observable<any> {
    return this.http.get<any[]>(`/api/developers/alldevs`);
  }

  getTreeDevs(): Observable<any> {
    return this.http.get<any[]>(`/api/developers/alldevs?limit=3`);
  }

  getDevById(id: string): Observable<any> {
    return this.http.get<Developer>(`/api/developers/devById`, { params: { developerId: id } });
  }
}
