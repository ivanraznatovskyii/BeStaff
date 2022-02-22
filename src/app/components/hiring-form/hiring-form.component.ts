import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initHiringForm();
    this.hiringFormTitle = this.initTitle();
  }

  isContactsPage() {
    return window.location.href.replace(window.location.origin + '/', '') === 'contacts';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
      email: ['', Validators.required],
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
      console.log(body)
      this.openSnackBar('Request has been submitted!', 'close')
    }
  }

}
