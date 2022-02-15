import { CommonService } from 'src/app/services/common.service.ts.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';

export interface Breadcrumbs {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Breadcrumbs[] = [];
  currentUser: any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService) {
      //this.currentUser = this.commonService.getDev();
      const devFromLS = JSON.parse(localStorage.getItem('currentDev') as string);
      if(devFromLS && devFromLS.developerId) this.currentUser = devFromLS;
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      this.breadcrumbs.unshift({label: 'Home', url: ''});
      /* console.log(this.breadcrumbs) */
  }

  ngOnInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
    ).subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    })
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumbs[] = []): Breadcrumbs[] {
    //If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path!.split('/').pop();
    const isDynamicRoute = lastRoutePart!.startsWith(':');
    if(isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart!.split(':')[1];
      path = path!.replace(lastRoutePart!, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: Breadcrumbs = {
        label: label,
        url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
    //console.log(newBreadcrumbs)
    if (route.firstChild) {
        //If we are not on our current path yet,
        //there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    if(newBreadcrumbs[newBreadcrumbs.length - 1].label === "Developer`s details" && this.currentUser) newBreadcrumbs[newBreadcrumbs.length - 1].label = this.currentUser.name;
    return newBreadcrumbs;
  }

  changeColor() {
    return window.location.href.replace(window.location.origin + '/', '') === 'contacts' ? true :  false ;
  }

  addDeveloperName() {

  }

}
