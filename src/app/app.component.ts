import { Component, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { faCommentDots, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showToTopButton: boolean = false;

@HostListener("window:scroll", []) onWindowScroll() {
  const verticalOffset = window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop || 0;
  this.getOffset(verticalOffset);
}


  title = 'BeStaff';

  faComment = faCommentDots;
  faArrowAltCircleUp = faArrowAltCircleUp;

  getOffset(offcet: number) {
    offcet > 600 ? this.showToTopButton = true : this.showToTopButton = false;
  }

  goToTop() {
    window.scrollTo(0,0)
    // const el = document.querySelector('.logo');
    // el?.scrollIntoView(true);
  }
}
