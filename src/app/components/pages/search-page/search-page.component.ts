import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
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
export class SearchPageComponent implements OnInit {



  panelOpenState = false;
  isDevsLoaded: boolean = false;

  faSearch = faSearch;
  skillsList: Skills[] = [];
  stacksList: Stacks[] = [];
  radioArr: number[] = [];
  cardsHeight: string = '378px';

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
  seniorityJunior: FormControl = new FormControl();
  seniorityMiddle: FormControl = new FormControl();
  senioritySenior: FormControl = new FormControl();
  exSlider: FormControl = new FormControl();
  radioItem: FormControl = new FormControl('1');
  searchFormGroup!: FormGroup;

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

   /*  this.devService.getOriginDevs().subscribe(devs => {
      //console.log(stacks)
      this.devs = devs;
      console.log(devs)
    }); */

    this.devService.getStacks().subscribe(stacks => {
      //console.log(stacks)
      this.skillsList = stacks;
      this.initSearchForm();
    });

    this.devService.getAllDevs().subscribe(devs => {
      this.devs = devs;
      //this.fakeDevs();
      this.makeRadioArr();
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
    /* const devFromLS = localStorage.getItem('currentDev');
    if(devFromLS) {
      const devsId = JSON.parse(devFromLS).developerId;
      if(devsId) {
        this.devService.getDevById(devsId).subscribe(dev => {
          console.log(dev)
        })
      }
    } */
    //this.createRequestBody()
  }

  goToTop() {
    const el = document.querySelector('.logo');
    el?.scrollIntoView(true);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getDevById(id: string) {
    this.devService.getDevById(id).subscribe(dev => {
      this.commonService.setDev(dev);
    })
  }

  /* fakeDevs() {
    for(let i = 0; i < 3; i++) {
      const newItms = this.devs;
      newItms.map((item: any) => {
        this.devsArr.push({
          name: item.name,
          position: item.position,
          specialization: item.specialization,
          developerId: item.developerId,
          email: item.email,
          agreementAccepted: true,
          skills: item.skills,
          seniority: item.seniority,
          experience: item.experienceYears,
          location: item.location,
        });
      })
      this.devs.reverse();
    }
  } */

  makeRadioArr() {
    for(let i = 0; i < this.cardsPerPage; i++) {
      this.radioArr.push(+(i + 1));
    }
  }

  currentYearsExp(value: number) {
    return value;
  };

  searchBlockIsShowed() {
    return window.location.href.replace(window.location.origin + '/developers/', '').includes('details');
  };

  preparePaginator() {
    for(let i = 1; i < this.pagesCount + 1; i++) {
      this.pagesNumberArray.push(i);
    }
  }

  /* computedPageNumber() {
    this.pagesCount = Math.ceil(this.devsArr.length / this.cardsPerPage);
  } */

  addVisibleCards() {
    this.showedCards = [];
    this.isDevsLoaded = false;
    this.pagesNumberArray = [];
    /* const start = (this.currentPage - 1) * this.cardsPerPage;
    for(let i = start; i < start + this.cardsPerPage; i++) {
      this.showedCards.push(this.devsArr[i])
    } */
    let query = { 'ResultsOnPage': this.cardsPerPage, 'Page': this.currentPage, ...this.queryParams };
    this.searchService.searchByParams(query).subscribe(devs => {
      //console.log(devs);
      this.showedCards = devs.items;
      this.totalDevsCount = devs.totalCount;
      //console.log('totalDevsCount', this.totalDevsCount)
      this.pagesCount = Math.ceil(this.totalDevsCount / this.cardsPerPage);
      //console.log('pagesCount', this.pagesCount)
      this.preparePaginator();
      //console.log('pagesNumberArray', this.pagesNumberArray)
      this.isDevsLoaded = true;
      this.getCardsHeight();
    })
  }

  changeCurrentPage(arg: string | number) {
    const el = document.querySelector('.dev-card-list') as HTMLElement;
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
    el.style.transform = `translateX(0)`;
  }

  initSearchForm() {
    let formObj = {};
    this.skillsList.map(item => {
      //@ts-ignore
      formObj[item.id] = '';
    });
    this.searchFormGroup = this.fb.group(formObj);

  }

  clearFilters() {
    this.searchFormGroup.reset();
    this.seniorityJunior.reset();
    this.seniorityMiddle.reset();
    this.senioritySenior.reset();
    this.exSlider.reset();
    this.queryParams = {};
  }

  navigateToCV(dev: any) {
    this.commonService.setDev(dev);
    const params = { developerId: dev.developerId };
    this.router.navigate([`/developers/details/`], { queryParams: params });
  }

  change() {
    const step = (100 / this.cardsPerPage);
    const el = document.querySelector('.dev-card-list') as HTMLElement;
    switch(this.radioItem.value) {
      case 1:
        el.style.transform = `translateX(-${step * 0}%)`;
        break;
      case 2:
        el.style.transform = `translateX(-${step * 1}%)`;
        break;
      case 3:
        el.style.transform = `translateX(-${step * 2}%)`;
        break;
      case 4:
        el.style.transform = `translateX(-${step * 3}%)`;
        break;
      case 5:
        el.style.transform = `translateX(-${step * 4}%)`;
        break;
      case 6:
        el.style.transform = `translateX(-${step * 5}%)`;
        break;
      default: el.style.transform = 'translateX(0)';
    }
    el?.scrollIntoView({ block: 'center', inline: 'start' })
  }

  onOutletLoaded(component: any) {
    //component.node = 'someValue';
    //console.log(component)
  }

  getCardsHeight() {
    this.showedCards.map((dev: any) => {
      if(dev && dev.skills && dev.skills.length) {
        const newHeight = +dev.skills.join(' ').length;
        if(newHeight > +this.cardsHeight.replace('px', '')) {
          this.cardsHeight = newHeight + 'px';
        }
      }
    })
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
    const body = {};
    if(this.searchFormGroup.status === 'VALID'
        && this.exSlider.status === 'VALID'
        && this.seniorityJunior.status === 'VALID'
        && this.seniorityMiddle.status === 'VALID'
        && this.senioritySenior.status === 'VALID'
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
    if(this.seniorityJunior.value) body['Seniority'] = '344F6AD6-9134-EC11-8388-CCD9ACDD6EF8';
    if(this.seniorityMiddle.value) body['Seniority'] = '334F6AD6-9134-EC11-8388-CCD9ACDD6EF8';
    if(this.senioritySenior.value) body['Seniority'] = '324F6AD6-9134-EC11-8388-CCD9ACDD6EF8';
    if(skills) skills.map(skill => body['Stacks'] = skill.id);
    body['ResultsOnPage'] = JSON.stringify(this.cardsPerPage);
    body['Page'] = JSON.stringify(this.currentPage);
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

}
