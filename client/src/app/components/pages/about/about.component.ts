import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  showBanner: boolean = true;
  isShowed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  bannerIsShowed() {
    return window.location.href.replace(window.location.origin + '/about', '') === '';
  };

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

}
