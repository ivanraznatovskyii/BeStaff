import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-available-developers',
  templateUrl: './available-developers.component.html',
  styleUrls: ['./available-developers.component.scss']
})
export class AvailableDevelopersComponent implements OnInit {

  asyncTabs: Observable<any[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<any[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {
  }

}
