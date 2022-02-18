import { DevelopersService } from 'src/app/services/developers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Skills } from 'src/app/interfaces/skills';
import { Stacks } from 'src/app/interfaces/stacks';
import { Positions } from 'src/app/interfaces/positions';

import { SearchService } from 'src/app/services/search.service';
import { map, Observable, startWith } from 'rxjs';

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
  seniorityJunior: FormControl = new FormControl();
  seniorityMiddle: FormControl = new FormControl();
  senioritySenior: FormControl = new FormControl();
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
              private searchService: SearchService, ) {
    this.getPositions();
    /* this.getStacks();
    this.getSkills(); */
  }

  ngOnInit(): void {
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
      console.log(positions)
      //localStorage.setItem('positions', JSON.stringify(positions));
      this.positionsList = positions;
      this.getStacks();
      this.getSkills();
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
    let formObj = {
      seniorityJunior: '',
      seniorityMiddle: '',
      senioritySenior: '',
      exSlider: '',
    };
    this.stacksList.map(item => {
      //@ts-ignore
      formObj[item.id] = '';
    });
    this.searchFormGroup = this.fb.group(formObj);

  }

  developersSearch() {

  }

  clearFilters() {
    this.searchFormGroup.reset();
    this.seniorityJunior.reset();
    this.seniorityMiddle.reset();
    this.senioritySenior.reset();
    this.exSlider.reset();
  }

  searchByQuery() {
    if(this.query.status === 'VALID') {
      this.searchService.searchByQuery(this.query.value).subscribe(devs => {
        console.log(devs)
        /* this.devsArr = devs; */
      })
    }
  }

  searchByStackQuery() {
    const params = {
      searchstring: '',
      experienceYears: null,
      stacks: [],
      seniority: [],
      page: 1,
      resultsonpage: 6,
    };
    if(this.searchFormGroup.status === 'VALID'
        && this.exSlider.status === 'VALID'
        && this.seniorityJunior.status === 'VALID'
        && this.seniorityMiddle.status === 'VALID'
        && this.senioritySenior.status === 'VALID') {
      const skills = this.getSelectedSkills(params.stacks);
      if(this.exSlider.value) params.experienceYears = this.exSlider.value;
      // @ts-ignore
      if(this.seniorityJunior.value) params.seniority.push('Junior');
      // @ts-ignore
      if(this.seniorityMiddle.value) params.seniority.push('Middle');
      // @ts-ignore
      if(this.senioritySenior.value) params.seniority.push('Senior');
      console.log(params)
      if(this.query.value) params.searchstring = this.query.value;
      // this.searchService.searchByParams(this.query.value).subscribe(devs => {
      //   console.log(devs)
      //   /* this.devsArr = devs; */
      // })
    }
  }

  getSelectedSkills(stacksArr: any[]): any {
    for(let item in this.searchFormGroup.controls) {
      if(this.searchFormGroup.get(item)!.value) {
        stacksArr.push(this.skillsList.find(skill => skill.id === item))
      }
    }

    return stacksArr;
  }

  optionWasSelected(event: any) {
    console.log(event)
  }


}
