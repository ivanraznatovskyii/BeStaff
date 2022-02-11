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
  }

  
  bannerIsShowed() {
    return window.location.href.replace(window.location.origin + '/calculate', '') === '';
  };

  visibilityToggle() {
    this.isShowed = !this.isShowed;
  }

}
