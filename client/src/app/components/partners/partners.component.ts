import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  radioItem: FormControl = new FormControl('1');

  constructor() { }

  ngOnInit(): void {
  }

  change() {
    const el = document.querySelector('.partners') as HTMLElement;
    switch(this.radioItem.value) {
      case 1:
        el.style.transform = 'translateX(0)'; 
        break;
      case 2:
        el.style.transform = 'translateX(-27%)';
        break;
      case 3:
        el.style.transform = 'translateX(-60%)';
        break;
      case 4:
        el.style.transform = 'translateX(-71%)';
        break;
      default: el.style.transform = 'translateX(0)';
    }
    el?.scrollIntoView({ block: 'center', inline: 'start' })
  }

}
