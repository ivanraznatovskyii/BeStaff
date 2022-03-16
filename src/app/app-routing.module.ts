import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevDetailsComponent } from './components/dev-details/dev-details.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CalculateComponent } from './components/pages/calculate/calculate.component';
import { CareerComponent } from './components/pages/career/career.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { EmptyPageComponent } from './components/pages/empty-page/empty-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { ServicesComponent } from './components/pages/services/services.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { breadcrumb: 'Register'} },
  { path: 'about', component: AboutComponent, data: { breadcrumb: 'About'} },
  { path: 'register', component: RegistrationComponent, data: { breadcrumb: 'Register'} },
  { path: 'developers', component: SearchPageComponent, data: { breadcrumb: 'Developers'}, children: [
    { path: 'details', component: DevDetailsComponent, data: { breadcrumb: 'Developer`s details'} },
  ] },
  { path: 'calculate', component: CalculateComponent, data: { breadcrumb: 'Calculate your project'} },
  { path: 'services', component: ServicesComponent, data: { breadcrumb: 'Services '} },
  { path: 'contacts', component: ContactsComponent, data: { breadcrumb: 'Contacts '} },
  { path: 'career', component: CareerComponent, data: { breadcrumb: 'Career '} },
  { path: 'owner', component: EmptyPageComponent, data: { breadcrumb: 'Owner developed page '} },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
