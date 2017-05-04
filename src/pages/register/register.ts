import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomeLoggedIn } from '../home-logged-in/home-logged-in';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  registerPassword: any;
  registerPasswordConfirm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  // Register User
  register() {
    if (this.registerPassword == this.registerPasswordConfirm) {
      // Do Registration via API
      sessionStorage['name'] = "User";
      this.navCtrl.setRoot(HomeLoggedIn);
    } else {
      this.presentPasswordAlert();
    }
  }

  // Create Username Alert
  presentPasswordAlert() {
    let alert = this.alertCtrl.create({
      title: 'Mismatched Passwords',
      subTitle: 'Please ensure passwords match',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
