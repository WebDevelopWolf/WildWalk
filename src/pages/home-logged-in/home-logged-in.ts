import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Slides } from 'ionic-angular';

import { WildWalkApi } from "../../app/shared/shared";
import { Discovery } from '../discovery/discovery';

@IonicPage()
@Component({
  selector: 'page-home-logged-in',
  templateUrl: 'home-logged-in.html',
})
export class HomeLoggedIn {

  //public login: any;
  //public repos = [];
  username: any = sessionStorage['name'];
  userImage: any;
  userLevel = 4;
  userExp = 50;
  display = false;
  


  constructor(public navCtrl: NavController, public navParams: NavParams, private wwapi: WildWalkApi, private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeLoggedIn - User Session Owner: ' + sessionStorage['name']);

    // JSON API Load
    //this.wwapi.getLoginTest().then(data => this.login = data).then(data => console.log(this.login));
    //let selectedUser = 'WebDevelopWolf';
    //this.wwapi.getRepoData(selectedUser).subscribe(data => {
      ///this.repos = data.items;
    //});

    // Populate User Pic
    this.userImage = this.getUserPic();
  }

  // Wire up Discovery Buttons
  Discovery($event, section) {
    this.navCtrl.setRoot(Discovery, section);
  }

  // Load User Pic 
  getUserPic() {
    if (this.username) {
      return 'assets/img/user/'+ this.username +'/avatar.png';
    } else {
      return 'assets/img/user/avatar.png';
    }
  }

  // Get User Level 
  getUserLevel() {
    if (this.username) {
      return this.userLevel;
    } else {
      return 1;
    }
  }

  // Get User Exp
  getUserExp() {
    if (this.username) {
      return this.userExp;
    } else {
      return 0;
    }
  }

  // Gallery Overlay
  showOverlay() { 
    if (this.display) {
      this.display = false;
    } else if(!this.display) {
      this.display = true; 
    }
  }

  hideOverlay() {
    this.display = false;
  }

  // Load 10 Random Gallery Images

  // Load New Residents

  // Link New Residents

  // Wire up donate button
  donate() {
    window.open('http://www.gentleshawwildlife.co.uk/', '_system', 'location=yes');
  }
}
