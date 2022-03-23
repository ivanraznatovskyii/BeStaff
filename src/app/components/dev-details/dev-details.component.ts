import { DevelopersService } from 'src/app/services/developers.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { faCommentDots, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service.ts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailsMatchesDirective } from 'src/app/directives/email-matches.directive';

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
  isAgreementAccepted!: boolean;
  isSubmit: boolean = false;
  cvForm!: FormGroup;
  hiringForm!: FormGroup;
  devId: string = '';

  constructor(private router: Router,
              private commonService: CommonService,
              private _route: ActivatedRoute,
              private fb: FormBuilder,
              private devService: DevelopersService,
              private _snackBar: MatSnackBar ) {
    const body = {
      name: 'name',
      email: 'email',
      text: 'text'
    };
    this.devService.getTreeDevs().subscribe(devs => {
      this.showedCards = devs.items;
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
    this.devId = this.router.routerState.snapshot.url.replace('/developers/details?developerId=', '');
    console.log(this.currentDev)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
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
    window.scrollTo(0,0)
    // const el = document.querySelector('.logo');
    // el?.scrollIntoView(true);
  }

  initSVForm() {
    this.cvForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, emailsMatchesDirective()]],
      agreementAccepted: [' ']
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

  submitRequestForCVDevById() {
    this.isSubmit = true;
    this.cvForm.controls['agreementAccepted'].patchValue(this.isAgreementAccepted);
    for(let item in this.cvForm.controls) {
      this.cvForm.controls[item].markAsTouched();
    }
    this.cvForm.updateValueAndValidity();
    const body = {
      name: this.cvForm.get('name')!.value,
      text: this.cvForm.get('surname')!.value,
      email: this.cvForm.get('email')!.value,
    };
    if(this.cvForm.status === 'VALID' && this.isAgreementAccepted) {
      this.devService.submitRequestForCVDevById(this.devId, this.commonService.makeBody(body)).subscribe(response => {
        if(response.status === 200) {
          this.openSnackBar('Request has been submitted!', 'close')
        }
      })
    }
  }

  showErrors(errors) {
    console.log(errors)
    if(errors['pattern']) {
      return 'pattern';
    } else if(errors['required']) {
      return 'required';
    } else if(errors['minlength']) {
      return 'minlength';
    } else if(errors['email']) {
      return 'email';
    } else if(errors['forbiddenEmail']) {
      return 'forbiddenEmail';
    } else {
      return false
    }
  }


}
