
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { faLink, faTimes } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { Positions } from 'src/app/interfaces/positions';
import { Skills } from 'src/app/interfaces/skills';
import { Stacks } from 'src/app/interfaces/stacks';
import { DevelopersService } from 'src/app/services/developers.service';
import { CommonService } from 'src/app/services/common.service.ts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { positionsMatchesDirective } from 'src/app/directives/positions-mathes.directive';
import { emailsMatchesDirective } from 'src/app/directives/email-matches.directive';
import { skillsMatchesDirective } from 'src/app/directives/skillsmatches.directive';

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

  cvFilenames: string[] = [];
  files!: FileList;

  isFormsLoaded: boolean = false;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  therdFormGroup!: FormGroup;
  positionsList: Positions[] = [];
  filteredPositions!: Observable<Positions[]>;

  loremOne: FormControl = new FormControl(false, Validators.required);
  loremTwo: FormControl = new FormControl(false, Validators.required);

  @ViewChild('fileInput', {static: true }) fileInput: any;
  @ViewChild('stepper', {static: true }) stepper!: MatStepper

  skills: Skills[] = [];
  isSkillsLoaded: boolean = false;
  stacks: Stacks[] = [];
  isStacksLoaded: boolean = false;
  isSkillsValid: boolean = false;
  registrationHaveBeenCompleted: boolean = false;
  filteredOptions!: Observable<Skills[]>;
  filteredOtherOptions!: Observable<Skills[]>;
  choosedSkills: Skills[] = [];
  choosedOtherSkills: Skills[] = [];
  filteredOptionsForStacks!: Observable<Stacks[]>;
  choosedStackss: Stacks[] = [];
  lenguageLevels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  constructor(private fb: FormBuilder, 
              private devService: DevelopersService, 
              private _snackBar: MatSnackBar,
              private commonService: CommonService) {
    devService.getSkills().subscribe((skills: Skills[]) => {
      this.skills = skills;
      this.isSkillsLoaded = true;
    });
    this.getPositions();
  }

  ngOnInit(): void {
    this.goToTop();
    //this.initForms()
  }

  goToTop() {
    window.scrollTo(0,0)
    // const el = document.querySelector('.logo');
    // el?.scrollIntoView(true);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  initFilters() {
    if(this.firstFormGroup && this.firstFormGroup.get('Position')) {
      this.filteredPositions = this.firstFormGroup.get('Position')!.valueChanges.pipe(
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

    if(this.secondFormGroup && this.secondFormGroup.get('otherSkills')) {
      this.filteredOtherOptions = this.secondFormGroup.get('otherSkills')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSkills(value)),
      );
    }
  }

  initForms() {
    this.firstFormGroup = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(2)]],
      Surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/), Validators.minLength(2)]],
      Email: ['', [Validators.required, Validators.email]],
      Location: ['', [Validators.required, Validators.pattern(/^[a-zA-Z,-]*$/), Validators.minLength(2)]],
      Position: ['', [Validators.required, positionsMatchesDirective(this.positionsList)]],
      Description: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      skill: [''
    ],
      otherSkills: [''],
      Experience: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
      cvFile: ['', Validators.required]
    });

    this.therdFormGroup = this.fb.group({
      EnglishListeningTest: ['', Validators.required],
      EnglishGrammarTest: ['', Validators.required]
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
    if(value && value.length) {
      let msxItemLength = 0;
      for(let item of this.skills) {
        if(item && item.name && item.name.length > msxItemLength) msxItemLength = item.name.length;
      }
      const filterValue = value.toLowerCase();
      const filteredSkillsList = this.skills.filter(option => option.name.toLowerCase().includes(filterValue));
      const filteredSkills: Skills[] = [];
      let totalMatch = {id:'', name: ''};
      filteredSkillsList.map(item => {
        for(let i = 1; i < msxItemLength; i++) {
          if(value && value.length && item && item.name && item.name.length === i && item.name.length === value.length && item.name.toLowerCase() === value.toLowerCase()) {
            totalMatch = item;
          } else if(item && item.name && item.name.length === i) {
            if(filteredSkills.findIndex(el => el.name === item.name) === -1) {
              if(item && item.name && item.name[0].toLowerCase() === value[0].toLowerCase()) {
                filteredSkills.unshift(item)
              } else {
                filteredSkills.push(item) 
              }
            }
          }
        }
      });
      if(totalMatch.id && totalMatch.name) filteredSkills.unshift(totalMatch);
      return filteredSkills;
    } else {
      return this.skills;
    }
  }

  /* _filterOtherSkills(value: string): Stacks[] {
    if(value) {
      const filterValue = value.toLowerCase();
      return this.skills.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.skills;
    }
  } */

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
    if(files.files.length > 0) {
      this.files = files.files;

      for(let i = 0; i < files.files.length; i++) {
        file = files.files[i];
        filename = file.name.split('.')[0];
        this.cvFilenames.push(filename);
        // splittedStringLength = file.name.split('.').length;
        // fileExtension = file.name.split('.')[splittedStringLength - 1];
      }
    } else {
      this.cvFilenames = [];
    }
  }

  showFilenames() {
    let string = '';
    for(let item of this.cvFilenames) {
      string += item + ', ';
    }
    
    return string.slice(-string.length, -2);
  }

  /* getSenioritiesList() {
    this.devService.getSeniorities().subscribe((list) => {
      console.log(list)
      if(list){
        this.senioritiesList = list;
      }
      this.initForms();
    });
  } */

  removeFiles() {
    this.secondFormGroup.get('cvFile')?.reset();
    this.cvFilenames = [];
  }

  addSkillSelected(event: any) {
    this.optionWasSelected(event, 'skill');
  }

  otherSkillsSelected(event: any, value: string) {
    this.optionWasSelected(event, 'otherSkills', value);
  }

  optionWasSelected(event: any, controlName: string, value?: string) {
    const skillName = event && event.option.value ? event.option.value : value;
    ///console.log(skillName);
    const successArr: boolean[] = [];
    for(let item of this.choosedSkills) {
      this.skills.map(el => {
        if(item.name === el.name) successArr.push(true)
      })
    }
    this.isSkillsValid = this.choosedSkills.length === successArr.length;
    const isFull = controlName === 'skill' ? this.choosedSkills.length >= 10 : this.choosedOtherSkills.length >= 30;
    const choosedSkill = this.skills.find(item => item.name === skillName);
    if(choosedSkill && this.checkIsCopy(choosedSkill, controlName)) {
      if(!isFull) {
        controlName === 'skill' ? this.choosedSkills.push(choosedSkill) : this.choosedOtherSkills.push(choosedSkill);
      } else if(isFull) {
        this.openSnackBar('Skills count must be less then 10', 'OK')
      }
    } else if(!choosedSkill && value) {
      if(!isFull) {
        controlName === 'skill' ? this.choosedSkills.push({id: '', name: value}) : this.choosedOtherSkills.push({id: '', name: value});
      } else if(isFull) {
        this.openSnackBar('Other skills count must be less then 30', 'OK')
      }
    };

    this.secondFormGroup.get(controlName)?.reset();
    this._filterSkills('');
  }

  checkIsCopy(skillCandidate: Stacks, controlName: string) {
    let isFind
    controlName === 'skill' ? isFind = this.choosedSkills.find(item => item.id === skillCandidate.id)
                            : isFind = this.choosedOtherSkills.find(item => item.id === skillCandidate.id);
    if(isFind) {
      return false;
    } else {
      return true;
    }
  }

  ulWidth() {
    return this.choosedSkills.length > 0 ? '100%' : '0';
  }

  removeSkill(id: string, where: string) {
    if(where === 'skill') {
      this.choosedSkills = this.choosedSkills.filter(skill => skill.id !== id);
    } else {
      this.choosedOtherSkills = this.choosedOtherSkills.filter(skill => skill.id !== id);
    }
    
  }

  compliteRegistration() {
    //this.registrationHaveBeenCompleted = true;
    const body = {};
    if(this.firstFormGroup.status === 'VALID'
        && this.secondFormGroup.status === 'VALID'
        && this.therdFormGroup.status === 'VALID'
        && this.loremOne.status === 'VALID'
        && this.loremTwo.status === 'VALID'
        && this.isSkillsValid) {

      for(let item in this.firstFormGroup.controls) {
        body[item] = this.firstFormGroup.controls[item].value;
      }
      for(let item in this.secondFormGroup.controls) {
        if(item !== 'cvFile' && item !== 'skill' && item !== 'otherSkills') {
          body[item] = this.secondFormGroup.controls[item].value;
        }
      }
      for(let item in this.therdFormGroup.controls) {
        body[item] = this.therdFormGroup.controls[item].value;
      }
    } else {
      this.firstFormGroup.updateValueAndValidity();
      this.secondFormGroup.updateValueAndValidity();
      this.therdFormGroup.updateValueAndValidity();
    }
    // console.log(this.firstFormGroup.status)
    // console.log(this.secondFormGroup.status)
    // console.log(this.therdFormGroup.status)
    console.log(body)
    const preparedBody = this.commonService.makeBody(body, this.files, this.choosedSkills, this.choosedOtherSkills);
    console.log(preparedBody)
    this.devService.registerDev(preparedBody).subscribe(res => {
      console.log(res)
    })
    // console.log(this.firstFormGroup.controls)
    // console.log(this.secondFormGroup.controls)
    // console.log(this.therdFormGroup.controls)
    // console.log(this.loremOne)
    // console.log(this.loremTwo)
  }

  hendleAddSkill(event: any, controlName: string) {
    if(event.code === 'Enter') {
      event.preventDefault();
      this.optionWasSelected(null, controlName, this.secondFormGroup.get(controlName)!.value);
    }
  }

  showValue() {
    console.log('listen', this.therdFormGroup.get('EnglishListeningTest')?.value)
    console.log('gram', this.therdFormGroup.get('EnglishGrammarTest')?.value)
  }

}
