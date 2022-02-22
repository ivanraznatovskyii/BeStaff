import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  showBanner: boolean = true;
  isShowed: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.goToTop();
  }

  bannerIsShowed() {
    return window.location.href.replace(window.location.origin + '/', '') === '';
  };

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

  goToTop() {
    const el = document.querySelector('.logo');
    el?.scrollIntoView(true);
  }

}
