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
    //console.log('getStacks')
    return this.http.get<any[]>(`/api/developers/stacks`);
  }

  getSkills(): Observable<any> {
    //console.log('getSkills')
    return this.http.get<any[]>(`/api/registration/skills`);
  }

  getAllPositions() {
    //console.log('getAllPositions')
    return this.http.get<any[]>(`/api/registration/positions`);
  }

  getAllDevs(): Observable<any> {
    //console.log('getAllDevs')
    return this.http.get<any[]>(`/api/developers/available`);
  }

  getTreeDevs(): Observable<any> {
    const props = { 'ResultsOnPage': 3, 'Page': 1 };
    return this.http.post<any[]>(`/api/developers/search`, props);
  }

  getDevById(id: string): Observable<any> {
    //console.log('getDevById')
    return this.http.get<Developer>(`/api/developers/developer/${id}`/* , { params: { developerId: id } } */);
  }

  getSeniorities(): Observable<any> {
    return this.http.get<any[]>(`/api/developers/seniorities`);
  }

  submitRequestForCVDevById(id: string, body: any): Observable<any> {
    console.log('request must be submitted')
    console.log('body', body)
    return this.http.post<Developer>(`/api/developer/${id}/cv`, body, {observe: 'response'});
  }

  registerDev(body: FormData): Observable<any> {
    return this.http.post<Developer>(`/api/registration`, body, {observe: 'response'});
  }

}
