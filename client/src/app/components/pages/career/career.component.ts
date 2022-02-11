import { DevelopersService } from 'src/app/services/developers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Skill } from '../search-page/search-page.component';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  panelOpenState = false;
  
  
  faSearch = faSearch;
  query: FormControl = new FormControl();
  skillsList: Skill[] = [];
  seniorityJunior: FormControl = new FormControl();
  seniorityMiddle: FormControl = new FormControl();
  senioritySenior: FormControl = new FormControl();
  exSlider: FormControl = new FormControl();
  /* jobTitle: FormControl = new FormControl();
  city: FormControl = new FormControl();
  category: FormControl = new FormControl(); */
  searchFormGroup!: FormGroup;
  addCVFormGroup: FormGroup = new FormGroup({
    jobTitle: new FormControl(),
    city: new FormControl(),
    category: new FormControl()
  });
  sliderValue: number = 0;
  screenWidth: number = document.documentElement.scrollWidth;

  @ViewChild('searchForm') searchForm!: FormGroup;

  showBanner: boolean = true;
  isShowed: boolean = true;

  constructor(private fb: FormBuilder, private devService: DevelopersService) {
    this.devService.getSkills().subscribe(skills => {
      this.skillsList = skills;
      this.initSearchForm();
   } );
  }

  ngOnInit(): void {
    /* window.onresize = function(event) {
      console.log(event)
    }; */
    this.initSearchForm();
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
    this.skillsList.map(item => {
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


}
