import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatMenu } from '@angular/material/menu';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showBanner: boolean = true;
  isShowed: boolean = true;
  isMenuOpenedCheckox: FormControl = new FormControl();

  @ViewChild('mobileMenu', { static: true }) mobileMenu!: MatMenu;

  constructor(private route: Router) { }

  ngOnInit(): void {
    /* if(window.location.href.replace(window.location.origin + '/', '') === '') {
      this.showBanner = true;
    }
    console.log(window.location.href.replace(window.location.origin + '/', '')) */
  }

  bannerIsShowed() {
    return window.location.href.replace(window.location.origin + '/', '') === '';
  };

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

  onMobileMenuClose() {
    this.isMenuOpenedCheckox.setValue(!this.isMenuOpenedCheckox.value);
  }

}
