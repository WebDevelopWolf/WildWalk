import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeLoggedIn } from './home-logged-in';

@NgModule({
  declarations: [
    HomeLoggedIn,
  ],
  imports: [
    IonicPageModule.forChild(HomeLoggedIn),
  ],
  exports: [
    HomeLoggedIn
  ]
})
export class HomeLoggedInModule {}
