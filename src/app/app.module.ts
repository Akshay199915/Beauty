import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OurServicesComponent } from './shared/our-services/our-services.component';
import { TestimonialsComponent } from './shared/testimonials/testimonials.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { FaqComponent } from './shared/faq/faq.component';

import { HomeComponent } from './screens/home/home.component';
import { ServicesComponent } from './screens/services/services.component';
import { CartComponent } from './screens/cart/cart.component';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { BeautitionInfoComponent } from './screens/beautition-info/beautition-info.component';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    CartComponent,
    CheckoutComponent,
    BeautitionInfoComponent,
    PageNotFoundComponent,
    TestimonialsComponent,
    OurServicesComponent,
    LoaderComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    NgxPageScrollCoreModule,
    HttpClientModule
  ],
  providers: [CookieService,{provide:APP_BASE_HREF,useValue : ""}],
  bootstrap: [AppComponent]
})
export class AppModule { }