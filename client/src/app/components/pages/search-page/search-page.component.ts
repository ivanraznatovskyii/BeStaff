import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service.ts.service';
import { Router } from '@angular/router';
import { DevelopersService } from 'src/app/services/developers.service';

export interface Skill {
  name: string,
  id: string
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  providers: [CommonService]
})
export class SearchPageComponent implements OnInit {



  panelOpenState = false; // FOR EXAMPLE
  


  faSearch = faSearch;
  skillsList: Skill[] = [];
  radioArr: number[] = [];

  asyncTabs!: Observable<any[]>;
  pagesCount!: number;
  cardsPerPage: number = 6;
  currentPage: number = 1;
  pagesNumberArray: any[] = [];
  showedCards: any[] = [];
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


  devs: any = [
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
    },
  ];

  

  constructor(private commonService: CommonService, private router: Router, private devService: DevelopersService, private fb: FormBuilder ) { 

    devService.getSkills().subscribe(skills => {
       this.skillsList = skills;
       this.initSearchForm();
    } );
    
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
          agreementAccepted: true,
          skills: item.skills,
          seniority: item.seniority,
          experience: item.experience,
          location: item.location,
        });
      })
      this.devs.reverse();
    }
    this.makeRadioArr();
    this.computedPageNumber();
    this.addVisibleCards();
    this.preparePaginator();
  }

  makeRadioArr() {
    for(let i = 0; i < this.cardsPerPage; i++) {
      this.radioArr.push(+(i + 1));
    }
  }

  currentYearsExp(value: number) {
    return value;
  };

  searchBlockIsShowed() {
    return window.location.href.replace(window.location.origin + '/developers/', '') === 'details';
  };

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
    this.radioItem.setValue(1);
  }

  initSearchForm() {
    let formObj = {};
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

  navigateToCV(dev: any) {
    this.commonService.setDev(dev);
    this.router.navigate(['/developers/details'], {
      state: {
        data: 'dev'
      }
    })
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

}
