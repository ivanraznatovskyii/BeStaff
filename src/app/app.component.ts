import { AboutComponent } from './components/pages/about/about.component';
import { BehaviorSubject, Observer } from 'rxjs';
import { Component, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

@HostListener('window:resize', []) onWindowResize() {
  const horizontalOffset = +document.querySelector('.app-container')!.clientWidth;
  this.getHorizontaleOffcet(horizontalOffset);
}


  title = 'BeStaff';

  faComment = faCommentDots;
  faArrowAltCircleUp = faArrowAltCircleUp;
  isQuestionShowed: boolean = true;
  isMinimize: boolean = false;

  backgroundColor: string = 'transparent';
  isDeviderShoved: boolean = false;


  constructor(private router: Router){
    /* console.log(router.url);
    console.log(router.events); */
    
    router.events
          .subscribe(event => 
           {
              if(event instanceof NavigationEnd) {
                //this.currentRoute = event.url;
                //console.log(event.url);
                switch(event.url) {
                  case '/contacts':
                    this.backgroundColor = 'url("../assets/bg-hiring.png")';
                    this.isDeviderShoved = true;
                    break;
                  case '/career':
                    this.isDeviderShoved = false;
                    break;
                  default: this.isDeviderShoved = false;
                }
              };
           });
  }

  getOffset(offcet: number) {
    offcet > 400 ? this.showToTopButton = true : this.showToTopButton = false;
  }

  getHorizontaleOffcet(offcet: number) {
    offcet > 1050 ? this.isMinimize = false : this.isMinimize = true ;
  }

  questionToggle() {
    this.isQuestionShowed = !this.isQuestionShowed;
  }

  goToTop() {
    window.scrollTo(0,0)
    // const el = document.querySelector('.logo');
    // el?.scrollIntoView(true);
  }
}
