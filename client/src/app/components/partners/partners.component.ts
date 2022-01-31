import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  radioItem: FormControl = new FormControl('1')

  constructor() { }

  ngOnInit(): void {
  }

  change() {
    let el;
    switch(this.radioItem.value) {
      case 1:
        el = document.querySelector('#fst');
        break;
      case 2:
        el = document.querySelector('#scd');
        break;
      case 3:
        el = document.querySelector('#trd');
        break;
      default: el = document.querySelector('#fst');
    }
    el?.scrollIntoView({ block: 'center', inline: 'start' })
  }

}
