import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contuct-form',
  templateUrl: './contuct-form.component.html',
  styleUrls: ['./contuct-form.component.scss']
})
export class ContuctFormComponent implements OnInit {

  contactUsForm!: FormGroup;

  @ViewChild('contactForm') contactForm: any; //ned to add type

  constructor() { }

  ngOnInit(): void {
  }

}
