import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { breadcrumb: 'Register'} },
  { path: 'register', component: RegistrationComponent, data: { breadcrumb: 'Register'} },
  { path: 'developers', component: SearchPageComponent, data: { breadcrumb: 'Developers'} },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
