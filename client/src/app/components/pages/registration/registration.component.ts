import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { faLink, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        showError: false,
        displayDefaultIndicatorType: false,
        disableRipple: true
      },
    },
  ],
})
export class RegistrationComponent implements OnInit {

  faLink = faLink;
  faTimes =faTimes;

  cvFilename: string = '';

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  therdFormGroup!: FormGroup;

  loremOne: FormControl = new FormControl();
  loremTwo: FormControl = new FormControl();

  @ViewChild('fileInput') fileInput: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
      jobTitle: ['', Validators.required],
      text: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      skill: ['', Validators.required],
      otherSkills: ['', Validators.required],
      exYears: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
      cvFile: ['']
    });
    this.therdFormGroup = this.fb.group({
      therdCtrl: ['', Validators.required],
    });
  }

  onFileSelected(files: any) {
    let file;
    let filename;
    let fileExtension;
    let splittedStringLength;
    if(files.files[0]) {
      file = files.files[0];
      filename = file.name.split('.')[0];
      this.cvFilename = filename;
      splittedStringLength = file.name.split('.').length;
      fileExtension = file.name.split('.')[splittedStringLength - 1];
    } else {
      this.cvFilename = '';
    }
  }

  removeFiles() {
    this.secondFormGroup.get('cvFile')?.reset();
    this.cvFilename = '';
  }

}
