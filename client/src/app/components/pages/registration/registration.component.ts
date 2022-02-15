import { DevelopersService } from 'src/app/services/developers.service';
import { Skill } from './../search-page/search-page.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { faLink, faTimes } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, startWith } from 'rxjs';

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

  skills: Skill[] = [];
  isSkillsLoaded: boolean = false;
  registrationHaveBeenCompleted: boolean = false;
  filteredOptions!: Observable<Skill[]>;
  choosedSkills: Skill[] = [];

  constructor(private fb: FormBuilder, private devService: DevelopersService) {
    devService.getSkills().subscribe((skills: Skill[]) => {
      this.skills = skills;
      this.isSkillsLoaded = true;
    });
  }

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
      listenResults: ['', Validators.required],
      grammarResults: ['', Validators.required],
      vocabularyResults: ['', Validators.required],
    });

    this.filteredOptions = this.secondFormGroup.get('skill')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  _filter(value: string): Skill[] {
    if(value) {
      const filterValue = value.toLowerCase();
      return this.skills.filter(option => option.name.toLowerCase().includes(filterValue));
    } else {
      return this.skills;
    }
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

  optionWasSelected(event: any) {
    const skillName = event.option.value;
    const choosedSkill = this.skills.find(item => item.name === skillName);
    if(choosedSkill) {
      if(this.checkIsCopy(choosedSkill)) {
        this.choosedSkills.push(choosedSkill);
      }
    };
    console.log(this.choosedSkills)
    this.secondFormGroup.get('skill')?.reset();
    this._filter('');
  }

  checkIsCopy(skillCandidate: Skill) {
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
  }

}
