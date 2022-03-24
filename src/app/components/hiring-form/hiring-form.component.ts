import { DevelopersService } from 'src/app/services/developers.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service.ts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailsMatchesDirective } from 'src/app/directives/email-matches.directive';

@Component({
  selector: 'app-hiring-form',
  templateUrl: './hiring-form.component.html',
  styleUrls: ['./hiring-form.component.scss']
})
export class HiringFormComponent implements OnInit {

  hiringForm!: FormGroup;
  hiringFormTitle: string = 'Custom hiring form';
  isAgreementAccepted: boolean = false;
  isSubmit: boolean = false;
  devId: string = '';

  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private commonService: CommonService,
              private router: Router,
              private devService: DevelopersService) { }

  ngOnInit(): void {
    this.initHiringForm();
    this.hiringFormTitle = this.initTitle();
    this.devId = this.commonService.getDev().developerId;
  }

  isContactsPage() {
    return window.location.href.replace(window.location.origin + '/', '') === 'contacts';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  initTitle() {
    return this.isContactsPage() ? 'Contacts' :  'Custom hiring form' ;
  }

  paddingTop() {
    return this.isContactsPage() ? '50px' :  '0' ;
  }

  initHiringForm() {
    this.hiringForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, emailsMatchesDirective()]],
      text: ['', Validators.required],
      agreementAccepted: []
    })
  }

  sendHiringForm() {
    this.isSubmit = true;
    this.hiringForm.controls['agreementAccepted'].patchValue(this.isAgreementAccepted);
    for(let item in this.hiringForm.controls) {
      this.hiringForm.controls[item].markAsTouched();
    }
    this.hiringForm.updateValueAndValidity();
    const body = {
      name: this.hiringForm.get('name')!.value,
      surname: this.hiringForm.get('surname')!.value,
      email: this.hiringForm.get('email')!.value,
      text: this.hiringForm.get('text')!.value,
    };
    if(this.hiringForm.status === 'VALID' && this.isAgreementAccepted) {
      //this.devService.submitRequestForCVDevById(this.devId, this.commonService.makeBody(body)).subscribe(response => {
      this.devService.submitRequestForCVDevById(this.devId, body).subscribe(response => {
        if(response.status === 200) {
          this.openSnackBar('Request has been submitted!', 'close');
          this.hiringForm.reset();
          setTimeout(()=>this.router.navigate(['/']), 5000);
        } else {
          this.openSnackBar('Something went wrong!', 'close');
        }
      })
    } else if(!this.isAgreementAccepted) {
      this.openSnackBar('You need to accept BeStaff agreement and Terms of use!', 'close')
    } else if(this.hiringForm.status === 'INVALID') {
      this.openSnackBar('The form is invalid!', 'close')
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
