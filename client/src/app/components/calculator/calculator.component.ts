import { DevelopersService } from 'src/app/services/developers.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Developer } from 'src/app/interfaces/developer';
import { Skills } from 'src/app/interfaces/skills';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {

  faPlus = faPlus;

  isDevsLoading: boolean = true;

  calculatorSource!: MatTableDataSource<any>;
  calculatorTableColumns: string[] = ['technologyStach', 'seniority', 'contactType', 'desiredSalaryHour'];

  calculatorInput: FormControl = new FormControl();

  skills: Skills[] = [];

  data = [
    {
      technologyStach: [],
      seniority: ['Junior', 'Middle', 'Senior'],
      contactType: ['Part-time (20 hours min)', 'Full-time (80 hours min)'],
      desiredSalary: {
        perHour: 52,
        mounth: 52
      }
    },
    {
      technologyStach: [],
      seniority: ['Junior', 'Middle', 'Senior'],
      contactType: ['Part-time (20 hours min)', 'Full-time (80 hours min)'],
      desiredSalary: {
        perHour: 52,
        mounth: 52
      }
    }
    
  ];

  constructor(private devService: DevelopersService) { 
    
   }

  ngOnInit(): void {
    this.calculatorSource = new MatTableDataSource<any>(this.data);
    this.getTreeUsers();
  }

  getTreeUsers() {
    this.devService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.addSkills(this.skills)
      // this.calculatorSource = new MatTableDataSource<any>(this.devs);
      this.isDevsLoading = false;
    })
  }

  addSkills(skills: Skills[]) {
    this.data.forEach(item => {
      return (item.technologyStach as Array<Skills>).push(...skills);
    })
  }

  openSelect() {
    
  }

  leveSelect() {

  }

}
