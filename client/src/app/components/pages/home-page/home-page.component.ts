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
  }

  bannerIsShowed() {
    return window.location.href.replace(window.location.origin + '/', '') === '';
  };

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

}
