import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Developer } from '../interfaces/developer';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http: HttpClient) { }

  getStacks(): Observable<any> {
    return this.http.get<any[]>(`/api/developers/stacks`);
  }

  getSkills(): Observable<any> {
    console.log('Get skills state')
    return this.http.get<any[]>(`/api/developers/skills`);
  }

  getAllPositions() {
    return this.http.get<any[]>(`/api/registration/positions`);
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

  submitRequestForCVDevById(id: string, body: any)/* : Observable<any> */ {
    console.log('request must be submitted')
    //return this.http.post<Developer>(`/api/developers/devCVById`, { params: { developerId: id }, body } );
  }
}
