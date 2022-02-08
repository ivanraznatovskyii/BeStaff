import { DevelopersService } from 'src/app/services/developers.service';
import { CommonService } from './../../services/common.service.ts.service';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { Developer } from 'src/app/interfaces/developer';

@Component({
  selector: 'app-available-developers',
  templateUrl: './available-developers.component.html',
  styleUrls: ['./available-developers.component.scss']
})
export class AvailableDevelopersComponent implements OnInit {

  asyncTabs: Observable<any[]>;
  devs: Developer[] = [];
  tabs: any[] = [];
  positions!: Set<string>;

  constructor(private router: Router, private devService: DevelopersService) {
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

    devService.getAllDevs().subscribe(devs => {
      this.sortByPositions(devs);
      this.fillArrayByPositions(this.positions, this.tabs, devs);
      this.devs = devs;
    })
  }

  ngOnInit(): void {
  }

  sortByPositions(devs: Developer[]) {
    this.positions = new Set();
    devs.map(dev => {
      this.positions.add(dev.position.replace(' Developer', ''));
    });
  }

  fillArrayByPositions(set: Set<string>, tabs: any[], devs: Developer[]) {
    for(let str of set) {
      const result = devs.filter(item => item.position.replace(' Developer', '') === str);
      tabs.push({
        label: str,
        devs: result
      })
    }
  }

  navigateToCV() {
    this.router.navigate(['/developers/details'], {
      state: {
        message: 'message'
      }
    })
  }

}
