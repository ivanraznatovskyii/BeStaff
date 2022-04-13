import { FormControl } from '@angular/forms';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  radioItem: FormControl = new FormControl('0');
  radioItemsList: number[] = [];
  width = window.innerWidth;
  items: any[] = [
    { src: "../../../assets/daxx.svg" },
    { src: "../../../assets/epam.svg" },
    { src: "../../../assets/sigma.svg" },
    { src: "../../../assets/SoftServe.svg" },
    { src: "../../../assets/DataArt.svg" },
    { src: "../../../assets/ciklum.svg" },
    { src: "../../../assets/Luxoft.svg" },
  ];
  currentItems: any[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    this.changeSize();
  }

  constructor() { }
  
  ngOnInit(): void {
    this.currentItems = this.items;
    this.changeSize();
  }

  change() {
    this.changeSize();
  }

  changeSize() {
    this.radioItemsList = [];

    if(this.width < 1050) {
      let count;
      if(this.width < 500) {
        count = 1;
      } else if(this.width >= 500 && this.width < 570) {
        count = 2;
      } else if(this.width >= 570 && this.width < 820) {
        count = 3;
      } else if(this.width >= 820 && this.width < 1035) {
        count = 4;
      } else if(this.width >= 1035 && this.width < 1200) {
        count = 6;
      } else if(this.width >= 1200) {
        count = 7;
      }
      
      const pagesCount = Math.ceil(this.items.length / count);
      for(let i = 0; i < pagesCount; i++ ) {
        this.radioItemsList.push(+i);
      }
      const currentPage = this.radioItem.value > pagesCount ? pagesCount : this.radioItem.value;
      const start = currentPage * count;
      const last = start + count;
      this.currentItems = [];
      for(let i = start; i < last; i++ ) {
        this.currentItems.push(this.items[i])
      }
    }
  }

}
