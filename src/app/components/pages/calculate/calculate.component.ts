import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {

  showBanner: boolean = true;
  isShowed: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.goToTop();
  }

  bannerIsShowed() {
    return window.location.href.replace(window.location.origin + '/calculate', '') === '';
  };

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

  goToTop() {
    const el = document.querySelector('.logo');
    el?.scrollIntoView(true);
  }

}
