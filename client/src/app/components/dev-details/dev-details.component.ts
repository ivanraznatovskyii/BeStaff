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
  currentDev: any = null;
  showedCards: any[] = [];
  devsArr: any[] = [];
  isDevsLoading: boolean = true;
  cvForm!: FormGroup;
  hiringForm!: FormGroup;

  constructor(private router: Router, 
              private commonService: CommonService, 
              private _route: ActivatedRoute, 
              private fb: FormBuilder, 
              private devService: DevelopersService ) {
    devService.getTreeDevs().subscribe(devs => {
      this.showedCards = devs;
      this.isDevsLoading = false;
    })
  }

  ngOnInit(): void {
    this.initHiringForm();
    this.initSVForm();
    this.goToTop();

    this.currentDev = this.commonService.getDev()
    if(!this.currentDev) {
      this.router.navigate(['/developers']);
    }
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

  initHiringForm() {
    this.hiringForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      text: [''],
      agreementAccepted: [false]
    })
  }

  navigateToCV(dev: any) {
    this.commonService.setDev(dev);
    this.router.navigate(['/developers/details'], {
      state: {
        message: 'message'
      }
    })
  }

}
