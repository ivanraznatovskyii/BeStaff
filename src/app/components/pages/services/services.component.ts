import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  showBanner: boolean = true;
  isShowed: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.goToTop();
  }

  bannerIsShowed() {
    return window.location.href.replace(window.location.origin + '/services', '') === '';
  };

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

  goToTop() {
    const el = document.querySelector('.logo');
    el?.scrollIntoView(true);
  }

}
