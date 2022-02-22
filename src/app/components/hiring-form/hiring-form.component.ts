import { DevelopersService } from 'src/app/services/developers.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service.ts.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isJSDocThisTag } from 'typescript';

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

  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private commonService: CommonService,
              private router: Router,
              private devService: DevelopersService) { }

  ngOnInit(): void {
    this.initHiringForm();
    this.hiringFormTitle = this.initTitle();
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
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      //this.devService.submitRequestForCVDevById(this.devId, body)
      //console.log(body)
      this.devService.submitRequestForCVDevById(/* this.devId */'sddfsdf', this.commonService.makeBody(body)).subscribe(response => {
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

}
