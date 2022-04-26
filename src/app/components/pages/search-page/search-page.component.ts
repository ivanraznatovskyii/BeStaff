import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AfterContentChecked, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service.ts.service';
import { Router } from '@angular/router';
import { DevelopersService } from 'src/app/services/developers.service';
import { SearchService } from 'src/app/services/search.service';
import { Skills } from 'src/app/interfaces/skills';
import { Stacks } from 'src/app/interfaces/stacks';
import { Developer } from 'src/app/interfaces/developer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  providers: [CommonService]
})
export class SearchPageComponent implements OnInit, AfterContentChecked {

  width = window.innerWidth;
  cardsWidth = '370';
  cardsMargin: number | string = 5;
  currentCardsWidth: number = 3;

  disableSearchButton: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    this.changeSize();
  }

  panelOpenState = false;
  isDevsLoaded: boolean = false;

  faSearch = faSearch;
  skillsList: Skills[] = [];
  stacksList: Stacks[] = [];
  senioritiesList: any[] = [];
  radioArr: number[] = [];
  currentCards: any[] = [];
  cardsHeight: string = '580px';

  asyncTabs!: Observable<any[]>;
  pagesCount!: number;
  cardsPerPage: number = 6;
  currentPage: number = 1;
  pagesNumberArray: any[] = [];
  showedCards: Developer[] = [];
  totalDevsCount: number = 0;
  queryParams: Object = {};
  devsArr: any[] = [];
  query: FormControl = new FormControl();
  exSlider: FormControl = new FormControl();
  radioItem: FormControl = new FormControl('1');
  searchFormGroup!: FormGroup;
  seniorityFormGroup!: FormGroup;

  sliderValue: number = 0;

  @ViewChild('searchForm') searchForm!: FormGroup;


  devs: any = [/*
    {
      username: 'John Doe',
      position: 'Java Developer',
      location: 'Kiyiv',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 1,
      id: 1,
      email: 'example@examp.com',
      agreementAccepted: true,
      skills: ['Frontend', 'Backend', 'C#', 'Java Script', 'Angular', 'NodeJS', 'NestJS'],
      seniority: 'Senior',
    },
    {
      username: 'Mikkie Mouse',
      position: 'Java Developer',
      location: 'Texas',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 2,
      id: 2,
      email: 'example@examp.com',
      agreementAccepted: true,
      skills: ['Frontend', 'Backend', 'C#', 'Java Script', 'Java', 'React'],
      seniority: 'Senior',
    },
    {
      username: 'Gannibal Lecktor',
      position: 'C# Developer',
      location: 'Dallas',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 3,
      id: 3,
      email: 'example@examp.com',
      agreementAccepted: true,
      skills: ['Frontend', 'Backend', 'C#', 'Java Script', 'Java', 'React', 'Vue'],
      seniority: 'Senior',
    },
    {
      username: 'Ilon Mask',
      position: 'Tesla Developer',
      location: 'New York',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 4,
      id: 4,
      email: 'example@examp.com',
      agreementAccepted: true,
      skills: ['Frontend', 'Backend', 'C#', 'Java Script', 'Java', 'React', 'Vue', 'Angular'],
      seniority: 'Senior',
    },
    {
      username: 'Donald Trump',
      position: 'USA Developer',
      location: 'Paris',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 5,
      id: 5,
      email: 'example@examp.com',
      agreementAccepted: true,
      skills: ['Frontend', 'Backend', 'C#', 'Java Script', 'Java', 'React', 'Vue', 'Angular', 'NodeJS'],
      seniority: 'Senior',
    },
    {
      username: 'Nikola Tesla',
      position: 'Electricity Developer',
      location: 'London',
      specialization: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta perspiciatis, officiis amet voluptatum voluptate explicabo.',
      experience: 6,
      id: 6,
      email: 'example@examp.com',
      agreementAccepted: true,
      skills: ['Frontend', 'Backend', 'C#', 'Java Script', 'Java', 'React', 'Vue', 'Angular', 'NodeJS', 'NestJS'],
      seniority: 'Senior',
    }, */
  ];



  constructor(private commonService: CommonService,
              private router: Router,
              private devService: DevelopersService,
              private fb: FormBuilder,
              private searchService: SearchService,
              private _snackBar: MatSnackBar ) {

    this.devService.getStacks().subscribe(stacks => {
      //console.log(stacks)
      this.skillsList = stacks;
      this.getSenioritiesList();
      //this.initSearchForm();
    });

    this.devService.getAllDevs().subscribe(devs => {
      //console.log(devs)
      this.devs = devs;
      //this.fakeDevs();
      //this.makeRadioArr();
      //this.computedPageNumber();
      this.addVisibleCards();
      // this.preparePaginator();
      this.isDevsLoaded = true;
    })

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
    this.goToTop();
  }

  ngAfterContentChecked() {
    if(document.querySelector('.dev-card') && document.querySelector('.dev-card')!.clientWidth) {
      this.changeSize();
    }
  }

  goToTop() {
    window.scrollTo(0,0);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  getDevById(id: string) {
    this.devService.getDevById(id).subscribe(dev => {
      this.commonService.setDev(dev);
    })
  }

  makeRadioArr() {
    this.radioArr = [];
    const iterator = this.showedCards.length > 0 ? Math.ceil(this.showedCards.length / this.currentCardsWidth) : 0;
    if(iterator) {
      for(let i = 0; i < iterator; i++) {
        this.radioArr.push(+(i + 1));
      }
    }
    
  }

  currentYearsExp(value: number) {
    return value;
  };

  searchBlockIsShowed() {
    return window.location.href.replace(window.location.origin + '/developers/', '').includes('details');
  };

  preparePaginator() {
    if(this.pagesCount <= 10) {
      for(let i = 1; i < this.pagesCount + 1; i++) {
        this.pagesNumberArray.push(i);
      }
    } else if (this.pagesCount > 10 && (this.currentPage < 5 || this.currentPage > this.pagesCount - 5)) {
      for(let i = 1; i < 6; i++) {
        this.pagesNumberArray.push(i);
      }
      this.pagesNumberArray.push('...');
      const tempArray: number[] = [];
      for(let i = this.pagesCount; i > this.pagesCount - 5; i--) {
        tempArray.push(i);
      }
      tempArray.reverse();
      this.pagesNumberArray.push(...tempArray);
    } else if(this.pagesCount > 10 
              && this.currentPage >= 5
              && this.pagesCount - 5 > this.currentPage + 2
              && this.currentPage + 2 < this.pagesCount - 5) {
      this.pagesNumberArray.push('1');        
      this.pagesNumberArray.push('...');
      for(let i = this.currentPage - 2; i < this.currentPage + 3; i++) {
        this.pagesNumberArray.push(i);
      }
      this.pagesNumberArray.push('...');
      const tempArray: number[] = [];
      for(let i = this.pagesCount; i > this.pagesCount - 5; i--) {
        tempArray.push(i);
      }
      tempArray.reverse();
      this.pagesNumberArray.push(...tempArray);
    } else {
      this.pagesNumberArray.push('1');        
      this.pagesNumberArray.push('...');
      for(let i = this.currentPage - 2; i < this.pagesCount + 1; i++) {
        this.pagesNumberArray.push(i);
      }
    }
  }

  addVisibleCards() {
    //this.currentCards = [];
    this.showedCards = [];
    this.isDevsLoaded = false;
    this.pagesNumberArray = [];
    let query = { 'ResultsOnPage': this.cardsPerPage, 'Page': this.currentPage, ...this.queryParams };
      this.searchService.searchByParams(query).subscribe(devs => {
      //console.log(devs);
      this.showedCards = devs.items;
      this.totalDevsCount = devs.totalCount;
      this.pagesCount = Math.ceil(this.totalDevsCount / this.cardsPerPage);
      this.preparePaginator();
      this.isDevsLoaded = true;
      this.disableSearchButton = false;
      /* let to;
      this.width < 1050 ? to = this.currentCardsWidth : to = this.cardsPerPage;
      for(let i = 0; i < to; i++) {
        this.currentCards.push(this.showedCards[i])
      }; */
      //this.makeRadioArr();
    });
    //this.changeSize();
  }

  changeCurrentPage(arg: string | number) {
    //const el = document.querySelector('.dev-card-list') as HTMLElement;
    if(arg === '-') {
      if(this.currentPage > 1) {
        this.currentPage--;
        this.addVisibleCards();
      }
    } else if (arg === '+') {
      if(this.currentPage < this.pagesCount) {
        this.currentPage++;
        this.addVisibleCards();
      }
    } else if(typeof arg === 'number' && arg !== this.currentPage) {
      this.currentPage = arg;
      this.addVisibleCards();
    }
    this.radioItem.setValue(1);
    //el.style.transform = `translateX(0)`;
  }

  initSearchForm() {
    let formObj = {};
    this.skillsList.map(item => {
      formObj[item.id] = '';
    });
    this.searchFormGroup = this.fb.group(formObj);
    this.initSeniorityForm();
  }

  initSeniorityForm() {
    let formObj = {};
    this.senioritiesList.map(item => {
      formObj[item.id] = '';
    });
    this.seniorityFormGroup = this.fb.group(formObj);
  }

  clearFilters() {
    this.query.reset();
    this.searchFormGroup.reset();
    this.seniorityFormGroup.reset();
    this.exSlider.reset();
    this.queryParams = {};
  }

  navigateToCV(dev: any) {
    this.commonService.setDev(dev);
    const params = { developerId: dev.developerId };
    this.router.navigate([`/developers/details/`], { queryParams: params });
  }

  /* change() {
    this.currentCards = [];
    const start = this.currentCardsWidth * (this.radioItem.value - 1);
    const finish = start + this.currentCardsWidth;
    for(let i = start; i < finish; i++ ) { if(this.showedCards[i]) this.currentCards.push(this.showedCards[i]) };
  } */

  onOutletLoaded(component: any) {
    //component.node = 'someValue';
    //console.log(component)
  }

  getOverflow(dev) {
      if(dev && dev.skills && dev.skills.length && +dev.skills.join(' ').length > 300) {
        return 'scroll';
      } else {
        return 'hidden';
      }
  }

  getSenioritiesList() {
    this.devService.getSeniorities().subscribe((list) => {
      if(list){
        this.senioritiesList = list;
      }
      this.initSearchForm();
    });
  }

  searchByQuery() {
    if(this.query.status === 'VALID' && this.query.value && this.query.value.length > 2) {
      this.queryParams = { 'ResultsOnPage': this.cardsPerPage, 'Page': this.currentPage, 'SearchString': this.query.value };
      this.addVisibleCards();
    } else if(this.query.status === 'VALID' && this.query.value && this.query.value.length <= 2) {
      this.openSnackBar('Search string length must be more than 3 characters', 'close');
    } else if(this.query.status === 'INVALID') {
      this.openSnackBar('Search string is invalid', 'close');
    }
  }

  searchByStackQuery() {
    this.disableSearchButton = true;
    this.currentPage = 1;
    const body = {};
    if(this.searchFormGroup.status === 'VALID'
        && this.exSlider.status === 'VALID'
        && this.seniorityFormGroup.status === 'VALID'
        && this.query.status === 'VALID') {
    this.createRequestBody(body);
    this.queryParams = body;
    this.addVisibleCards();
    }
  }

  createRequestBody(body: Object) {
    const stacks = [];
    const skills = this.getSelectedSkills(stacks);
    if(this.query.value && this.query.value.length > 2) body['SearchString'] = this.query.value;
    if(this.exSlider.value) body['Expirience'] = this.exSlider.value;
    const sinList: string[] = [];
    for(let item of this.senioritiesList) {
      if(this.seniorityFormGroup.get(item.id) && this.seniorityFormGroup.get(item.id)!.value) sinList.push(item.id);
    }

    if(sinList.length > 0) body['Seniority'] = sinList;
    const skillsList: string[] = [];
    if(skills) skills.map(skill => skillsList.push(skill.id));
    if(skillsList.length > 0) body['Stacks'] = skillsList;
    body['ResultsOnPage'] = this.cardsPerPage;
    body['Page'] = this.currentPage;
    //console.log(body)
    return body;
  }

  getSelectedSkills(skillsArr: any[]): any {
    for(let item in this.searchFormGroup.controls) {
      if(this.searchFormGroup.get(item)!.value) {
        skillsArr.push(this.skillsList.find(skill => skill.id === item))
      }
    }

    return skillsArr;
  }

  changeSize() {
    //console.log(document.querySelector('.dev-card')!.clientWidth) // 370
    const cardWidth = (document.querySelector('.dev-card')!.clientWidth + 10) | 370;
    const twoCardsWidth = (cardWidth + 10) * 2;
    const treCardsWidth = (cardWidth + 15) * 3;
    if( this.width < twoCardsWidth ) {
      //console.log('this.width < twoCardsWidth')
      this.cardsMargin = (this.width - cardWidth) / 2;
      this.currentCardsWidth = 1;
    } else if(this.width > twoCardsWidth && this.width < treCardsWidth ) {
      if(this.radioItem.value > 3) {
        this.radioItem.setValue(1);
        this.currentCards = [this.showedCards[0], this.showedCards[1]];
      }
      //console.log('this.width > twoCardsWidth && this.width < treCardsWidth')
      this.cardsMargin = (this.width - twoCardsWidth) / 3;
      this.currentCardsWidth = 2;
    } else if(this.width > treCardsWidth) {
      //console.log('this.width > treCardsWidth')
      this.cardsMargin = 'inherit';
      this.currentCardsWidth = 3;
    }

    this.makeRadioArr();
    if(this.width > 1050) this.currentCards = this.showedCards;
    //console.log(document.querySelector('.dev-card-list')?.clientWidth)
  }

  calcMarginRight(devId) {
    //console.log(this.currentCardsWidth)
    const idx = this.showedCards.findIndex(item => item.developerId === devId);
    if(this.currentCardsWidth === 1) {
      //console.log('R1', this.cardsMargin, this.currentCardsWidth, this.width)
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx % 2 === 0) {
      //console.log('R2', this.cardsMargin, this.currentCardsWidth, this.width)
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx % 2 === 1) {
      //console.log('R3', this.cardsMargin, this.currentCardsWidth, this.width)
      return 'inherit';
    } else {
      //console.log('R4', this.cardsMargin, this.currentCardsWidth, this.width)
      return 'inherit';
    }
  }

  calcMarginLeft(devId) {
    const idx = this.showedCards.findIndex(item => item.developerId === devId);
    if(this.currentCardsWidth === 1) {
      //console.log('L1', this.cardsMargin, this.currentCardsWidth, this.width)
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx > 0 && idx % 2 === 0) {
      //console.log('L2', this.cardsMargin, this.currentCardsWidth, this.width)
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx % 2 === 0) {
      //console.log('L3', this.cardsMargin, this.currentCardsWidth, this.width)
      return this.cardsMargin + 'px';
    } else if(this.currentCardsWidth === 2 && idx % 2 === 1) {
      //console.log('L4', this.cardsMargin, this.currentCardsWidth, this.width)
      return this.cardsMargin + 'px';
    } else {
      //console.log('L5', this.cardsMargin, this.currentCardsWidth, this.width)
      return 'inherit';
    }
  }

}
