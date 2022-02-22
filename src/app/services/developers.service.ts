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
    //console.log('getTreeDevs')
    const props = new FormData();
    props.append('ResultsOnPage', '3');
    props.append('Page', '1');
    return this.http.post<any[]>(`/api/developers/search`, props);
  }

  getDevById(id: string): Observable<any> {
    //console.log('getDevById')
    return this.http.get<Developer>(`/api/developers/developer/${id}`/* , { params: { developerId: id } } */);
  }

  submitRequestForCVDevById(id: string, body: any)/* : Observable<any> */ {
    console.log('request must be submitted')
    //return this.http.post<Developer>(`/api/developers/devCVById`, { params: { developerId: id }, body } );
  }

}
