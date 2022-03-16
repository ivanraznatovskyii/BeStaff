import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss']
})
export class EmptyPageComponent implements OnInit {

  title: string = 'Owner page work';
  text: string = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus dolore aut consequuntur? Adipisci, iste minima! Magnam, laboriosam hic quos ipsum sequi dolorum molestias ea impedit corrupti possimus, inventore, facere tenetur esse explicabo minus ipsam nulla velit illum omnis exercitationem cumque veritatis. Corrupti, mollitia perspiciatis ratione saepe ab sint fugiat rerum.';

  constructor() { }

  ngOnInit(): void {
  }

}
