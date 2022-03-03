import { DevelopersService } from 'src/app/services/developers.service';
import { Skills } from 'src/app/interfaces/skills';
import { Stacks } from 'src/app/interfaces/stacks';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { faLink, faTimes } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith } from 'rxjs';
import { Positions } from 'src/app/interfaces/positions';
import { positionsMathesDirective } from 'src/app/directives/positions-mathes.directive';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  isFormsLoaded: boolean = false;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  therdFormGroup!: FormGroup;
  positionsList: Positions[] = [];
  filteredPositions!: Observable<Positions[]>;

  loremOne: FormControl = new FormControl();
  loremTwo: FormControl = new FormControl();

  @ViewChild('fileInput') fileInput: any;

  skills: Skills[] = [];
  isSkillsLoaded: boolean = false;
  stacks: Stacks[] = [];
  isStacksLoaded: boolean = false;
  registrationHaveBeenCompleted: boolean = false;
  filteredOptions!: Observable<Skills[]>;
  choosedSkills: Skills[] = [];
  filteredOptionsForStacks!: Observable<Stacks[]>;
  choosedStackss: Stacks[] = [];

  constructor(private fb: FormBuilder, private devService: DevelopersService, private _snackBar: MatSnackBar) {
    devService.getSkills().subscribe((skills: Skills[]) => {
      this.skills = skills;
      this.isSkillsLoaded = true;
    });
    this.getPositions();
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  initFilters() {
    if(this.firstFormGroup && this.firstFormGroup.get('position')) {
      this.filteredPositions = this.firstFormGroup.get('position')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterPositions(value)),
      );
    }

    if(this.secondFormGroup && this.secondFormGroup.get('skill')) {
      this.filteredOptions = this.secondFormGroup.get('skill')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSkills(value)),
      );
    }
  }

  initForms() {
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      position: ['', [Validators.required, positionsMathesDirective(this.positionsList)]],
      text: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      skill: ['', Validators.required],
      otherSkills: ['', Validators.required],
      exYears: ['', [Validators.required, Validators.pattern('[0-9]')]],
      cvFile: ['', Validators.required]
    });

    this.therdFormGroup = this.fb.group({
      listenResults: ['', Validators.required],
      grammarResults: ['', Validators.required],
      vocabularyResults: ['', Validators.required],
    });

    this.isFormsLoaded = true;
    this.initFilters();
  }

  getPositions() {
    this.devService.getAllPositions().subscribe(positions => {
      this.positionsList = positions;
      this.initForms();
    });
  }

  _filterSkills(value: string): Stacks[] {
    if(value) {
      const filterValue = value.toLowerCase();
      return this.skills.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.skills;
    }
  }

  _filterPositions(value: string): Positions[] {
    if(value) {
      const filterValue = value.toLowerCase();
      return this.positionsList.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.positionsList;
    }
  }

  onFileSelected(files: any) {
    let file;
    let filename;
    let fileExtension;
    let splittedStringLength;
    if(files.files[0]) {
      //console.log(files.files[0])
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

  optionWasSelected(event: any, value?: string) {
    const skillName = event && event.option.value ? event.option.value : value;
    ///console.log(skillName);
    const isFull = this.choosedSkills.length >= 10;
    const choosedSkill = this.skills.find(item => item.name === skillName);
    if(choosedSkill && this.checkIsCopy(choosedSkill)) {
      if(!isFull) {
        this.choosedSkills.push(choosedSkill);
      } else if(isFull) {
        this.openSnackBar('Skills count must be less then 10', 'OK')
      }
    } else if(!choosedSkill && value) {
      if(!isFull) {
        this.choosedSkills.push({id: '', name: value});
      } else if(isFull) {
        this.openSnackBar('Skills count must be less then 10', 'OK')
      }
    };
    //console.log(this.choosedSkills)
    this.secondFormGroup.get('skill')?.reset();
    this._filterSkills('');
  }

  checkIsCopy(skillCandidate: Stacks) {
    const isFind = this.choosedSkills.find(item => item.id === skillCandidate.id);
    if(isFind) {
      return false;
    } else {
      return true;
    }
  }

  ulWidth() {
    return this.choosedSkills.length > 0 ? '100%' : '0';
  }

  removeSkill(id: string) {
    this.choosedSkills = this.choosedSkills.filter(skill => skill.id !== id);
  }

  compliteRegistration() {
    this.registrationHaveBeenCompleted = true;
    const body = {};
    if(this.firstFormGroup.status === 'VALID'
        && this.secondFormGroup.status === 'VALID'
        && this.therdFormGroup.status === 'VALID') {
      
      for(let item in this.firstFormGroup.controls) {
        body[item] = this.firstFormGroup.controls[item].value;
      }
      for(let item in this.secondFormGroup.controls) {
        body[item] = this.secondFormGroup.controls[item].value;
      }
      for(let item in this.therdFormGroup.controls) {
        body[item] = this.therdFormGroup.controls[item].value;
      }
    } else {
      this.firstFormGroup.updateValueAndValidity();
      this.secondFormGroup.updateValueAndValidity();
      this.therdFormGroup.updateValueAndValidity();
    }
    console.log(this.firstFormGroup.status)
    console.log(this.secondFormGroup.status)
    console.log(this.therdFormGroup.status)
    console.log(body)
    /* console.log(this.firstFormGroup.controls)
    console.log(this.secondFormGroup.controls)
    console.log(this.therdFormGroup.controls)
    console.log(this.loremOne)
    console.log(this.loremTwo) */
  }

  hendleAddSkill(event: any) {
    if(event.code === 'Enter') {
      event.preventDefault();
      this.optionWasSelected(null, this.secondFormGroup.get('skill')!.value);
    }
  }

}
