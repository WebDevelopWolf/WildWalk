import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WildWalkApi } from "../../app/shared/shared";
import { Headers, RequestOptions, Http } from "@angular/http";
import { TimerComponent } from "../../app/timer";
import { Observable } from "rxjs/Rx";

@IonicPage()
@Component({
  selector: 'page-quiz-question',
  templateUrl: 'quiz-question.html',
})
export class QuizQuestion {

  @ViewChild(TimerComponent) timer: TimerComponent;

  section: any;
  headerImage: any = "assets/img/quiz/heading/mammals-question.png";
  userImage: any;
  username: any = sessionStorage['name'];
  currentScore: any;
  questionNo: any;
  noOfQuestions: any;
  question: any;
  questions: any;
  countdown: any;

  constructor(public navCtrl: NavController, private wwapi: WildWalkApi, public navParams: NavParams) {
    this.section = this.navParams.data;
  }

  // Start the clock!
  ngOnInit() {
    setTimeout(() => {
      this.timer.startTimer();
      this.countdown = 100;
      Observable.interval(1000).subscribe(x => {
        if (this.countdown > 0) {
          this.countdown--;
        }
        if (this.countdown === 0) {
          // Load Next Question
        }
      });
    }, 1000)
  }

  ionViewDidLoad() {
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
