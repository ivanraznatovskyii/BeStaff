import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<any> {
    return this.http.get<any[]>(`/api/developers/stacks`);
  }
}
