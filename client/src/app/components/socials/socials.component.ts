import { Component, OnInit } from '@angular/core';
import { faInstagram, faTwitter, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {

  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebook = faFacebookF;
  faGoogle = faGoogle;

  constructor() { }

  ngOnInit(): void {
  }

}
