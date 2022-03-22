import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Skills } from '../interfaces/skills';

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

  makeBody(body: Object, files?: FileList, skills?: Skills[], otherSkills?: Skills[]) {
    const props = new FormData();
    //console.log(body)
    for(let item in body) {
      if(item !== 'cvFile') {
        //console.log(body[item])
        props.append(item, body[item]);
      } 
      
      if(files) {
        //console.log(files)
        for(let i = 0; i < files.length; i++){
          props.append('Attachments', files[i]);
        }
      } 
      
      if(skills) {
        //console.log(skills)
        const list: string[] = [];
        for(let i = 0; i < skills.length; i++){
          list.push(skills[i].id)
        }
        props.append('Skills', JSON.stringify(list));
      } 
      
      if(otherSkills) {
        //console.log(otherSkills)
        const list: string[] = [];
        for(let i = 0; i < otherSkills.length; i++){
          list.push(otherSkills[i].id)
        }
        props.append('OtherSkills', JSON.stringify(list));
      } 
    }
    
    //console.log('Converted');
    // console.log({...props});
    // props.forEach(item => console.log(item))
    return props;
  }


}
