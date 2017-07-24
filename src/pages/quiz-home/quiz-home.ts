import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WildWalkApi } from "../../app/shared/shared";
import { Headers, RequestOptions, Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-quiz-home',
  templateUrl: 'quiz-home.html',
})
export class QuizHome {

  section: any;
  private apiurl : any;
  title: any;
  intro: any;
  headerImage: any;
  topScore: any;
  userScore: any;
  user: any;
  username: any = sessionStorage['name'];
  userImage: any;

  constructor(public navCtrl: NavController, private wwapi: WildWalkApi, public navParams: NavParams) {
    this.section = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad - Quiz Home for ' + this.section);

    // Get base quiz data
    this.apiurl = this.wwapi.baseUrl;
    this.wwapi.getRepoData('quiz/' + this.section).subscribe(data => {
      this.title = data.Title;
      this.intro = data.Intro;
      this.headerImage = data.HeaderImage;
    });

    // Dummy User and Scores 
    this.topScore = 12345;
    this.userScore = 995;
    this.user = 'Liane';

    // Populate User Pic
    this.userImage = this.getUserPic();
  }

  // Load User Pic 
  getUserPic() {
    if (this.username) {
      return 'assets/img/user/'+ this.username +'/avatar.png';
    } else {
      return 'assets/img/user/avatar.png';
    }
  }

}
