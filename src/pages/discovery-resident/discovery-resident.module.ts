import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscoveryResident } from './discovery-resident';

@NgModule({
  declarations: [
    DiscoveryResident,
  ],
  imports: [
    IonicPageModule.forChild(DiscoveryResident),
  ],
  exports: [
    DiscoveryResident
  ]
})
export class DiscoveryResidentModule {}
