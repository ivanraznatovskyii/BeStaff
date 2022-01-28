import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isShowed: boolean = true;
  isMenuOpenedCheckox: FormControl = new FormControl();

  @ViewChild('mobileMenu', { static: true }) mobileMenu!: MatMenu;

  constructor() { }

  ngOnInit(): void {
  }

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

  onMobileMenuClose() {
    this.isMenuOpenedCheckox.setValue(!this.isMenuOpenedCheckox.value);
  }

}
