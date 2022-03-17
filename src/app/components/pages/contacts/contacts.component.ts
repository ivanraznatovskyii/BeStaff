import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.goToTop();
  }

  goToTop() {
    window.scrollTo(0,0)
    // const el = document.querySelector('.logo');
    // el?.scrollIntoView(true);
  }

}
