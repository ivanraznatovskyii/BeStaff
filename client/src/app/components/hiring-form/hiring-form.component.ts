import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hiring-form',
  templateUrl: './hiring-form.component.html',
  styleUrls: ['./hiring-form.component.scss']
})
export class HiringFormComponent implements OnInit {

  hiringForm!: FormGroup;
  hiringFormTitle: string = 'Custom hiring form';

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initHiringForm();
    this.hiringFormTitle = this.initTitle();
  }

  initTitle() {
    return window.location.href.replace(window.location.origin + '/', '') === 'contacts' ? 'Contacts' :  'Custom hiring form' ;
  }

  paddingTop() {
    return window.location.href.replace(window.location.origin + '/', '') === 'contacts' ? '50px' :  '0' ;
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

}
