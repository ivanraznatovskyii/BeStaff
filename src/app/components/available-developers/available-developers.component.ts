import { DevelopersService } from 'src/app/services/developers.service';
import { CommonService } from './../../services/common.service.ts.service';
import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Developer } from 'src/app/interfaces/developer';

@Component({
  selector: 'app-available-developers',
  templateUrl: './available-developers.component.html',
  styleUrls: ['./available-developers.component.scss']
})
export class AvailableDevelopersComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    this.changeSize();
  }

  width = window.innerWidth;
  cardsWidth = '370';
  currentCardsWidth: number = 3;
  cardsMargin: number | string = 5;

  devs: Developer[] = [];
  tabs: any[] = [];
  positions!: Set<string>;
  specialties!: Set<string>;
  currentDev!: Developer;

  constructor(private commonService: CommonService, private router: Router, private devService: DevelopersService) {
    devService.getAllDevs().subscribe(devs => {
      //this.sortByPositions(devs);
      this.sortBySpecialty(devs);
      //this.fillArrayByPositions(this.positions, this.tabs, devs);
      this.fillArrayBySpecialties(this.specialties, this.tabs, devs);
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

  sortBySpecialty(devs: Developer[]) {
    this.specialties = new Set();
    devs.map(dev => {
      this.specialties.add(dev.specialty);
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

  fillArrayBySpecialties(set: Set<string>, tabs: any[], devs: Developer[]) {
    for(let str of set) {
      const result = devs.filter(item => item.specialty === str);
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

  getOverflow(dev) {
    if(dev && dev.skills && dev.skills.length && +dev.skills.join(' ').length > 300) {
      return 'scroll';
    } else {
      return 'hidden';
    }
  }

  changeSize() {
    //console.log(document.querySelector('.dev-card')!.clientWidth) // 370
    const cardWidth = (document.querySelector('.dev-card')!.clientWidth + 10) || 370;
    const twoCardsWidth = (cardWidth + 10) * 2;
    const treCardsWidth = (cardWidth + 15) * 3;
    if( this.width < twoCardsWidth ) {
      this.cardsMargin = (this.width - cardWidth) / 2;
      this.currentCardsWidth = 1;
    } else if(this.width > twoCardsWidth && this.width < treCardsWidth ) {
      this.cardsMargin = (this.width - twoCardsWidth) / 3;
      this.currentCardsWidth = 2;
    } else if(this.width > treCardsWidth) {
      this.cardsMargin = 'auto';
      this.currentCardsWidth = 3;
    }
    //console.log(document.querySelector('.dev-card-list')?.clientWidth)
  }

  calcMarginRight(devId) {
    const idx = this.devs.findIndex(item => item.developerId === devId);
    if(this.currentCardsWidth === 1) {
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx % 2 === 0) {
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx % 2 === 1) {
      return 'auto';
    } /* else if(this.currentCardsWidth === 3 && idx % 3 === 0) {
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 3 && idx % 3 === 1) {
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 3 && idx % 3 === 2) {
      return 0;
    } */ else {
      return 'auto';
    }
  }

  calcMarginLeft(devId) {
    const idx = this.devs.findIndex(item => item.developerId === devId);
    if(this.currentCardsWidth === 1) {
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx > 0 && idx % 2 === 0) {
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx % 2 === 0) {
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx % 2 === 1) {
      return this.cardsMargin + 'px';
    } /* else if(this.currentCardsWidth === 3 && idx % 3 === 0) {
      return 0;
    } else if(this.currentCardsWidth === 3 && idx % 3 === 1) {
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 3 && idx % 3 === 2) {
      return this.cardsMargin + 'px';
    } */ else {
      return 'auto';
    }
  }

}
