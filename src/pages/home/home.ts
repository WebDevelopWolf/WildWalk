import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { Register } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToLogin () {
    this.navCtrl.setRoot(Login);
  }

  goToRegister () {
    this.navCtrl.setRoot(Register);
  }

}
