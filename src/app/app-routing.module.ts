import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './screens/home/home.component';
import { ServicesComponent } from './screens/services/services.component';
import { CartComponent } from './screens/cart/cart.component';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { BeautitionInfoComponent } from './screens/beautition-info/beautition-info.component';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path : "",
    component : HomeComponent,
    pathMatch : "full"
  },
  {
    path : 'home',
    component:HomeComponent
  },
  {
    path : 'appointment',
    component:ServicesComponent
  },
  {
    path : 'beautition-info',
    component:BeautitionInfoComponent
  },
  {
    path : 'cart',
    component:CartComponent
  },
  {
    path : 'checkout',
    component : CheckoutComponent
  },
  {
    path : "**",
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
