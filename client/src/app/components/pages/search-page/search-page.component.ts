import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {



  panelOpenState = false; // FOR EXAMPLE
  currentYearsExp(value: number) {
    return value;
  };


  faSearch = faSearch;

  asyncTabs!: Observable<any[]>;
  username: string = 'User Name';
  position: string = 'Java Developer';
  pagesCount!: number;
  cardsPerPage: number = 6;
  currentPage: number = 1;
  specialization: string = '';
  experience: string = '';
  pagesNumberArray: any[] = [];
  showedCards: any[] = [];
  devsArr: any[] = [];
  query: FormControl = new FormControl();
  seniorityJunior: FormControl = new FormControl();
  seniorityMiddle: FormControl = new FormControl();
  senioritySenior: FormControl = new FormControl();
  searchFormGroup!: FormGroup;

  sliderValue: number = 0;



  devs: any = [
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      id: 1,
      email: 'example@examp.com',
      agreementAccepted: true,
    },
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      id: 2,
      email: 'example@examp.com',
      agreementAccepted: true,
    },
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      id: 3,
      email: 'example@examp.com',
      agreementAccepted: true,
    },
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      id: 4,
      email: 'example@examp.com',
      agreementAccepted: true,
    },
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      id: 5,
      email: 'example@examp.com',
      agreementAccepted: true,
    },
    {
      username: 'User Name',
      position: 'Java Developer',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      id: 6,
      email: 'example@examp.com',
      agreementAccepted: true,
    },
  ];

  @ViewChild('searchForm') searchForm!: FormGroup;

  constructor() { 
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
    for(let i = 0; i < 6; i++) {
      const newItms = this.devs;
      newItms.map((item: any) => {
        this.devsArr.push({
          username: item.username,
          position: item.position,
          specialization: item.specialization,
          id: item.id * i,
          email: item.email,
          agreementAccepted: true
        });
      })
      
    }
    this.computedPageNumber();
    this.addVisibleCards();
    this.preparePaginator();
    this.initSearchForm();
  }

  preparePaginator() {
    for(let i = 1; i < this.pagesCount + 1; i++) {
      this.pagesNumberArray.push(i);
    }
    
  }

  computedPageNumber() {
    this.pagesCount = Math.ceil(this.devsArr.length / this.cardsPerPage);
  }

  addVisibleCards() {
    this.showedCards = [];
    const start = (this.currentPage - 1) * this.cardsPerPage;
    for(let i = start; i < start + this.cardsPerPage; i++) {
      this.showedCards.push(this.devsArr[i])
    }
  }

  changeCurrentPage(arg: string | number) {
    if(arg === '-') {
      this.currentPage > 1 ? this.currentPage-- : this.currentPage;
    } else if (arg === '+') {
      this.currentPage < this.pagesCount ? this.currentPage++ : this.currentPage;
    } else if(typeof arg === 'number') {
      this.currentPage = arg;
    }
    this.addVisibleCards();
  }

  initSearchForm() {
    this.searchFormGroup = new FormGroup({
      frontend: new FormControl(),
      backend: new FormControl(),
      cCharp: new FormControl(),
      js: new FormControl(),
      dotNet: new FormControl(),
      sql: new FormControl(),
      qa: new FormControl(),
      php: new FormControl(),
      magento: new FormControl(),
      java: new FormControl(),
      ruby: new FormControl(),
      angular: new FormControl(),
      android: new FormControl(),
      ios: new FormControl(),
      devOps: new FormControl(),
      azure: new FormControl(),
      react: new FormControl(),
      vue: new FormControl(),
    });
  }

  developersSearch() {

  }

  clearFilters() {
    this.searchFormGroup.reset();
    this.seniorityJunior.reset();
    this.seniorityMiddle.reset();
    this.senioritySenior.reset();
  }

}
