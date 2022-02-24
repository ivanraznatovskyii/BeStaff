import { Component, OnInit } from '@angular/core';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  faComment = faCommentDots;

  constructor() { }

  ngOnInit(): void {
  }

}
