import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Discovery page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class Discovery {

  section: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.section = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Discovery - ' + this.section);
  }

}
