import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private dev: Subject<any> = new BehaviorSubject<any>([]);

  get dev$() {
    return this.dev.asObservable()
  }

  developer: any;


  constructor() { }

  setDev(dev: any) {
    this.developer = dev;
    localStorage.setItem('currentDev', JSON.stringify(dev));
  }

  getDev() {
    if(this.developer) {
      return this.developer;
    } else {
      localStorage.getItem('currentDev');
    }
  }


  addDev(data: any) {
    this.dev.next(data);
  }

  makeBody(body: Object) {
    const props = new FormData();
    for(let item in body) {
      props.append(item, body[item]);
    }
    //console.log('Converted');
    return props;
  }


}
