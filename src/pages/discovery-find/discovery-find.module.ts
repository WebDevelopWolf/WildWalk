import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscoveryFind } from './discovery-find';

@NgModule({
  declarations: [
    DiscoveryFind,
  ],
  imports: [
    IonicPageModule.forChild(DiscoveryFind),
  ],
  exports: [
    DiscoveryFind
  ]
})
export class DiscoveryFindModule {}
