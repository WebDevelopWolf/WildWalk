import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Discovery } from './discovery';

@NgModule({
  declarations: [
    Discovery,
  ],
  imports: [
    IonicPageModule.forChild(Discovery),
  ],
  exports: [
    Discovery
  ]
})
export class DiscoveryModule {}
