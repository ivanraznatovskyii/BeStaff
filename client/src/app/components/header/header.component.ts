import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isShowed: boolean = true;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor() { }

  ngOnInit(): void {
  }

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

}
