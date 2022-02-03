import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  isDevComponentVisible() {
    if(window.location.href.replace(window.location.origin + '/developers/', '') === 'details') {
      console.log('details')
    } else if(window.location.href.replace(window.location.origin + '/developers/', '') === '') {
      console.log('NO')
    }
  }
}
