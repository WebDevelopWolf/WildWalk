import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomeLoggedIn } from '../home-logged-in/home-logged-in';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

    usernameInput: any;
    passwordInput: any;
    username = "WebDevelopWolf";
    password = "lobo2lobo";
    name = "Liane";

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  // Log user in and create session
  login() {
    if (this.username == this.usernameInput) {
      if (this.password == this.passwordInput) {
        sessionStorage['name'] = this.name;
        this.navCtrl.setRoot(HomeLoggedIn);
      } else {
        this.presentUsernameAlert();
      }
    } else {
      this.presentUsernameAlert();
    }
    
  }

  // Create Username Alert
  presentUsernameAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: 'Incorrect Username / Password',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
