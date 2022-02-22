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

  devs: Developer[] = [];
  tabs: any[] = [];
  positions!: Set<string>;
  currentDev!: Developer;

  constructor(private commonService: CommonService, private router: Router, private devService: DevelopersService) {
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

  navigateToCV(dev: any) {
    this.commonService.setDev(dev);
    const params = { developerId: dev.developerId };
    this.router.navigate([`/developers/details/`], { queryParams: params });
  }

}
