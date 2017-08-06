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
  private apiurl : any;
  headerImage: any = "assets/img/quiz/heading/mammals-question.png";
  userImage: any;
  username: any = sessionStorage['name'];
  currentScore: any;
  questionNo: any;
  noOfQuestions: any;
  questionText: any;
  incorrectPrompt: any;
  correctPrompt: any;
  question: any;
  questions: Array<any>;
  countdown: any;

  constructor(public navCtrl: NavController, private wwapi: WildWalkApi, public navParams: NavParams) {
    this.section = this.navParams.data;
  }

  // Start the clock!
  ngOnInit() {
    setTimeout(() => {
      this.timer.startTimer();
      this.countdown = 100;
      // Decrease the timer bar in sync with the timer
      Observable.interval(1000).subscribe(x => {
        // Stop the clock!
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
    // Get quiz questions
    this.apiurl = this.wwapi.baseUrl;
    this.wwapi.getRepoData('quiz/questions/' + this.section).subscribe(data => {
      // Set first question
      this.questions = data;
      this.question = data[0];
      this.questionNo = 1;
      this.noOfQuestions = Object.keys(this.questions).length;
      this.questionText = this.question.Question_;
      this.incorrectPrompt = this.question.IncorrectPrompt;
      this.correctPrompt = this.question.CorrectPrompt;
    });

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
