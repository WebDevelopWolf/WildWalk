import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Slides } from 'ionic-angular';

import { WildWalkApi } from "../../app/shared/shared";
import { Discovery } from '../discovery/discovery';
import { gallery, profile } from '../../assets/js/classes.ts';

@IonicPage()
@Component({
  selector: 'page-home-logged-in',
  templateUrl: 'home-logged-in.html',
})
export class HomeLoggedIn {

  public login: any;
  username: any = sessionStorage['name'];
  userImage: any;
  userLevel = 4;
  userExp = 50;
  display = false;
  canvases = [];
  newResidents: Array<profile>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wwapi: WildWalkApi, private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeLoggedIn - User Session Owner: ' + sessionStorage['name']);

    // Get Gallery JSON
    this.wwapi.getRepoData('dashboard/Gallery').subscribe(data => {
      this.canvases = data;
      console.log(this.canvases);
    });

    // Get New Resident JSON
    this.wwapi.getRepoData('dashboard/NewResidents').subscribe(data => {
      this.newResidents = data;
      console.log(this.newResidents);
    });

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

  // Hide the green overlay on Gallery images
  hideOverlay() {
    this.display = false;
  }

  // Wire up the 'moments' button
  addGallery() {
    // Add gallery link when page is built
  }

  // Wire up donate button
  donate() {
    window.open('http://www.gentleshawwildlife.co.uk/', '_system', 'location=yes');
  }
}
