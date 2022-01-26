import { Component, OnInit } from '@angular/core';
import { faInstagram, faTwitter, faYoutube, faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {

  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebook = faFacebookF;
  faYoutube = faYoutube;

  constructor() { }

  ngOnInit(): void {
  }

}
