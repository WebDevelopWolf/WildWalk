import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { WildWalkApi } from "../../app/shared/shared";

@IonicPage()
@Component({
  selector: 'page-home-logged-in',
  templateUrl: 'home-logged-in.html',
})
export class HomeLoggedIn {

  public login: any;
  public repos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private wwapi: WildWalkApi, private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.wwapi.getLoginTest().then(data => this.login = data).then(data => console.log(this.login));
    console.log('ionViewDidLoad HomeLoggedIn')

    let selectedUser = 'WebDevelopWolf';
    this.wwapi.getRepoData(selectedUser).subscribe(data => {
      this.repos = data.items;
    });
  }

}
