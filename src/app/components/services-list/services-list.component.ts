import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  servicesArray: any[] = [
    {
      servicesText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, molestiae illo velit non repellendus alias tenetur animi laboriosam nobis! Nobis, ex. Fugiat, delectus. Distinctio beatae ipsam quasi facere quibusdam dolore obcaecati. At itaque corporis corrupti culpa, quia aliquam minus repellat.',
      headingText: 'Our Service',
      icon: 'url(../../../assets/sprite/NewGroupe0.png)'
    },
    {
      servicesText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, molestiae illo velit non repellendus alias tenetur animi laboriosam nobis! Nobis, ex. Fugiat, delectus. Distinctio beatae ipsam quasi facere quibusdam dolore obcaecati. At itaque corporis corrupti culpa, quia aliquam minus repellat.',
      headingText: 'Our Service',
      icon: 'url(../../../assets/sprite/NewGroupe11.png)'
    },
    {
      servicesText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, molestiae illo velit non repellendus alias tenetur animi laboriosam nobis! Nobis, ex. Fugiat, delectus. Distinctio beatae ipsam quasi facere quibusdam dolore obcaecati. At itaque corporis corrupti culpa, quia aliquam minus repellat.',
      headingText: 'Our Service',
      icon: 'url(../../../assets/sprite/NewGroupe23.png)'
    },
    {
      servicesText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, molestiae illo velit non repellendus alias tenetur animi laboriosam nobis! Nobis, ex. Fugiat, delectus. Distinctio beatae ipsam quasi facere quibusdam dolore obcaecati. At itaque corporis corrupti culpa, quia aliquam minus repellat.',
      headingText: 'Our Service',
      icon: 'url(../../../assets/sprite/NewGroupe37.png)'
    },
    {
      servicesText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, molestiae illo velit non repellendus alias tenetur animi laboriosam nobis! Nobis, ex. Fugiat, delectus. Distinctio beatae ipsam quasi facere quibusdam dolore obcaecati. At itaque corporis corrupti culpa, quia aliquam minus repellat.',
      headingText: 'Our Service',
      icon: 'url(../../../assets/sprite/NewGroupe8.png)'
    },
    {
      servicesText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, molestiae illo velit non repellendus alias tenetur animi laboriosam nobis! Nobis, ex. Fugiat, delectus. Distinctio beatae ipsam quasi facere quibusdam dolore obcaecati. At itaque corporis corrupti culpa, quia aliquam minus repellat.',
      headingText: 'Our Service',
      icon: 'url(../../../assets/sprite/NewGroupe22.png)'
    },
  ];

  

  constructor() { }

  ngOnInit(): void {
  }


}
