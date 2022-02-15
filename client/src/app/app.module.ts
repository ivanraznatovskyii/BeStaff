import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialsComponent } from './components/socials/socials.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerComponent } from './components/banner/banner.component';
import { AvailableDevelopersComponent } from './components/available-developers/available-developers.component';
import { AdCalculationComponent } from './components/ad-calculation/ad-calculation.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { PartnersComponent } from './components/partners/partners.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DevDetailsComponent } from './components/dev-details/dev-details.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CenterTableComponent } from './components/center-table/center-table.component';
import { CalculateComponent } from './components/pages/calculate/calculate.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { HiringFormComponent } from './components/hiring-form/hiring-form.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { ContactsComponent } from './components/pages/contacts/contacts.component';
import { CareerComponent } from './components/pages/career/career.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchPageComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    SocialsComponent,
    PaymentsComponent,
    BannerComponent,
    AvailableDevelopersComponent,
    AdCalculationComponent,
    BenefitsComponent,
    PartnersComponent,
    RegistrationComponent,
    BreadcrumbsComponent,
    DevDetailsComponent,
    AboutComponent,
    CenterTableComponent,
    CalculateComponent,
    CalculatorComponent,
    ServicesComponent,
    HiringFormComponent,
    ServicesListComponent,
    ContactsComponent,
    CareerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FontAwesomeModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    MatRadioModule,
    MatRippleModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSliderModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTableModule,
    MatStepperModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
