import { CommonService } from './../../services/common.service.ts.service';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-available-developers',
  templateUrl: './available-developers.component.html',
  styleUrls: ['./available-developers.component.scss']
})
export class AvailableDevelopersComponent implements OnInit {

  asyncTabs: Observable<any[]>;
  username: string = 'User Name';
  position: string = 'Java Developer';
  specialization: string = '';
  experience: string = '';
  devs: any = [
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
    },
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
    },
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
    }
  ];

  constructor(private router: Router) {
    this.asyncTabs = new Observable((observer: Observer<any[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Frontend', content: 'Contennt 1' },
          {label: 'Backend', content: 'Content 2'},
          {label: 'FullStack', content: 'Content 3'},
          {label: 'QA', content: 'Content 3'},
          {label: 'DevOps', content: 'Content 3'},
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {
  }

  navigateToCV() {
    this.router.navigate(['/developers/details'], {
      state: {
        message: 'message'
      }
    })
  }

}
