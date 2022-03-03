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
    const el = document.querySelector('.logo');
    el?.scrollIntoView(true);
  }

}
