import { DevelopersService } from 'src/app/services/developers.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { faCommentDots, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service.ts.service';

@Component({
  selector: 'app-dev-details',
  templateUrl: './dev-details.component.html',
  styleUrls: ['./dev-details.component.scss']
})
export class DevDetailsComponent implements OnInit {

  faComment = faCommentDots;
  faMapMarkerAlt = faMapMarkerAlt;
  currentDev: any;
  showedCards: any[] = [];
  devsArr: any[] = [];
  isDevsLoading: boolean = true;
  isDevLoaded: boolean = false;
  cvForm!: FormGroup;
  hiringForm!: FormGroup;
  devId: string = '';

  constructor(private router: Router,
              private commonService: CommonService,
              private _route: ActivatedRoute,
              private fb: FormBuilder,
              private devService: DevelopersService ) {
    this.devService.getTreeDevs().subscribe(devs => {
      this.showedCards = devs;
      this.isDevsLoading = false;
      this.loadUser();
    })
  }

  ngOnInit(): void {
    const fromLS = localStorage.getItem('currentDev');
    if(!this.currentDev && !fromLS) {
      this.router.navigate(['/developers'])
    };
    this.loadUser();
    this. devId = this.router.routerState.snapshot.url.replace('/developers/details?developerId=', '');
  }

  loadUser() {
    this.currentDev = this.commonService.getDev();
    const fromLS = localStorage.getItem('currentDev');
    if((!this.currentDev || this.currentDev) && fromLS) {
      this.currentDev = JSON.parse(fromLS);
      this.initRestFunctionality();
    } else if(!this.currentDev && !fromLS) {
      this.devService.getDevById(this.devId).subscribe(dev => {
        this.currentDev = dev;
        this.commonService.setDev(dev);
        this.initRestFunctionality();
      })
    }
  }

  initRestFunctionality() {
    this.isDevLoaded = true;
    this.initSVForm();
    this.goToTop();
  }

  goToTop() {
    const el = document.querySelector('.logo');
    el?.scrollIntoView(true);
  }

  initSVForm() {
    this.cvForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      agreementAccepted: [false]
    })
  }

  navigateToCV(dev: any) {
    localStorage.setItem('currentDev', JSON.stringify(dev));
    this.commonService.setDev(dev);
    this.currentDev = dev;
    const params = { developerId: dev.developerId };
    this.router.navigate([`/developers/details/`], { queryParams: params });
    this.goToTop();
  }

}
