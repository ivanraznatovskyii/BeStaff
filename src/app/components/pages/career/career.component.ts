import { DevelopersService } from 'src/app/services/developers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Skills } from 'src/app/interfaces/skills';
import { Stacks } from 'src/app/interfaces/stacks';
import { Positions } from 'src/app/interfaces/positions';

import { SearchService } from 'src/app/services/search.service';
import { map, Observable, startWith } from 'rxjs';
import { CommonService } from 'src/app/services/common.service.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  panelOpenState = false;


  faSearch = faSearch;
  query: FormControl = new FormControl();
  skillsList: Skills[] = [];
  stacksList: Stacks[] = [];
  positionsList: Positions[] = [];
  queryParams: Object = {};
  showedCards = [];
  isDevsLoaded = false;
  isStackLoaded: boolean = false;
  pagesNumberArray: number[] = [];
  cardsPerPage: number = 6;
  currentPage: number = 1;
  pagesCount: number = 0;
  totalDevsCount: number = 0;
  cardsHeight: string = '378px';
  radioArr: number[] = [];


  seniorityJunior: FormControl = new FormControl();
  seniorityMiddle: FormControl = new FormControl();
  senioritySenior: FormControl = new FormControl();
  radioItem: FormControl = new FormControl('1');
  exSlider: FormControl = new FormControl();
  searchFormGroup!: FormGroup;
  addCVFormGroup: FormGroup = new FormGroup({
    jobTitle: new FormControl(),
    city: new FormControl(),
    category: new FormControl()
  });
  sliderValue: number = 0;
  screenWidth: number = document.documentElement.scrollWidth;

  filteredPositions!: Observable<Positions[]>;
  filteredSkills!: Observable<Skills[]>;
  filteredStacks!: Observable<Stacks[]>;

  @ViewChild('searchForm') searchForm!: FormGroup;

  showBanner: boolean = true;
  isShowed: boolean = true;

  constructor(private fb: FormBuilder,
              private devService: DevelopersService,
              private searchService: SearchService,
              private commonService: CommonService,
              private router: Router,) {

    this.getPositions();
    /* this.getStacks();
    this.getSkills(); */
  }

  ngOnInit(): void {
    this.goToTop();
    this.initFilters();
  }

  initFilters() {
    this.filteredPositions = this.addCVFormGroup.get('jobTitle')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPositions(value)),
    );

    this.filteredSkills = this.addCVFormGroup.get('jobTitle')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPositions(value)),
    );
  }

  _filterPositions(value: string): Positions[] {
    if(value) {
      //console.log(value)
      const filterValue = value.toLowerCase();
      return this.positionsList.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.positionsList;
    }
  }

  _filterSkills(value: string): Skills[] {
    if(value) {
      //console.log(value)
      const filterValue = value.toLowerCase();
      return this.skillsList.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.skillsList;
    }
  }

  _filterStacks(value: string): Stacks[] {
    if(value) {
      //console.log(value)
      const filterValue = value.toLowerCase();
      return this.stacksList.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.stacksList;
    }
  }

  getSkills() {
    this.devService.getSkills().subscribe(skills => {
      //console.log(skills)
      this.skillsList = skills;
    });
  }

  getPositions() {
    this.devService.getAllPositions().subscribe(positions => {
      //console.log(positions)
      //localStorage.setItem('positions', JSON.stringify(positions));
      this.positionsList = positions;
      this.getStacks();
      this.getSkills();
      this.initSearchForm();
      //this.addVisibleCards();
    });
  }

  getStacks() {
    this.devService.getStacks().subscribe(stacks => {
      //console.log(stacks)
      this.stacksList = stacks;
      this.initSearchForm();
    });
  }

  getWidth() {
    this.screenWidth = document.documentElement.scrollWidth;
  }

  currentYearsExp(value: number) {
    return value;
  };

  bannerIsShowed() {
    return window.location.href.replace(window.location.origin + '/career', '') === '';
  };

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

  sendCV() {

  }

  initSearchForm() {
    let formObj = {};
    this.stacksList.map(item => {
      formObj[item.id] = false;
    });
    this.searchFormGroup = this.fb.group(formObj);
    this.isStackLoaded = true;
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

  clearFilters() {
    this.searchFormGroup.reset();
    this.seniorityJunior.reset();
    this.seniorityMiddle.reset();
    this.senioritySenior.reset();
    this.exSlider.reset();
  }

  searchByQuery() {
    if(this.query.status === 'VALID' && this.query.value > 2) {
      let query = { 'SearchString': this.query.value, 'ResultsOnPage': this.cardsPerPage, 'Page': this.currentPage, ...this.queryParams };
      this.searchService.searchByParams(query).subscribe(devs => {
        console.log(devs)
      })
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
    console.log(skills)
    //if(skills) skills.map(skill => body['Stacks'] = skill.id);
    body['ResultsOnPage'] = JSON.stringify(this.cardsPerPage);
    body['Page'] = JSON.stringify(this.currentPage);
    return body;
  }

  addVisibleCards() {
    this.showedCards = [];
    this.isDevsLoaded = false;
    this.pagesNumberArray = [];
    let query = {};
    this.queryParams ? query = { 'ResultsOnPage': this.cardsPerPage, 'Page': this.currentPage, ...this.queryParams }
                     : query = { 'ResultsOnPage': this.cardsPerPage, 'Page': this.currentPage };
    this.searchService.searchByParams(query).subscribe(devs => {
      console.log(devs)
      this.showedCards = devs.items;
      this.totalDevsCount = devs.totalCount;
      this.pagesCount = Math.ceil(this.totalDevsCount / this.cardsPerPage);
      this.preparePaginator();
      this.isDevsLoaded = true;
      this.getCardsHeight();
    });
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

  preparePaginator() {
    for(let i = 1; i < this.pagesCount + 1; i++) {
      this.pagesNumberArray.push(i);
    }
  }

  getSelectedSkills(skillsArr: any[]): any {
    for(let item in this.searchFormGroup.controls) {
      if(this.searchFormGroup.get(item)!.value) {
        skillsArr.push(this.skillsList.find(skill => skill.id === item))
      }
    }

    return skillsArr;
  }

  optionWasSelected(event: any) {
    console.log(event)
  }

  navigateToCV(dev: any) {
    this.commonService.setDev(dev);
    const params = { developerId: dev.developerId };
    this.router.navigate([`/developers/details/`], { queryParams: params });
  }

  goToTop() {
    const el = document.querySelector('.logo');
    el?.scrollIntoView(true);
  }

}
