import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  questionText: any;
  incorrectPrompt: any;
  correctPrompt: any;
  question: any;
  questions: Array<any>;
  countdown: any;
  answers: Array<any>;
  review: Array<any>;
  questionIncriment: any;
  clock: any;

  constructor(public navCtrl: NavController, private wwapi: WildWalkApi, public navParams: NavParams, private alertCtrl: AlertController) {
    this.section = this.navParams.data;
  }

  ngOnInit() {
    // Set Incriment
    this.questionIncriment = 0;
    this.currentScore = 0;
    this.review = [];
  }

  ionViewDidLoad() {
    this.wwapi.getRepoData('quiz/questions/' + this.section).subscribe(data => {
      // Set question
      this.questions = data;
      // Get first question
      this.loadQuestion();
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

  // Start Timer
  setTimer() {
    if (this.clock != null) {
      this.clock.unsubscribe();
    }
    setTimeout(() => {
      this.timer.startTimer();
      this.countdown = 100;
      // Decrease the timer bar in sync with the timer
      this.clock = Observable.interval(1000).subscribe(x => {
        // Stop the clock!
        if (this.countdown > 0) {
          this.countdown--;
        }
        if (this.countdown === 0) {
          // Load Next Question
          this.timer.initTimer();
          this.loadQuestion();
        }
      });
    }, 1000)
  }

  // Set answers
  setAnswers() {
    // Set answers
      this.wwapi.getRepoData('quiz/question/answers/' + this.question.QuestionId).subscribe(data => {
        this.answers = data;
        for (let answer of this.answers) {
          this.buildAnswerDisplay(answer);
          // Find correct Answer
          if (answer.Marker) {
            // Generate Correct Answer
            this.answerQuestionCorrectly(answer);
          } else {
            // Generate Incorrect Answer
            this.answerQuestionIncorrectly(answer);
          }
        }
      });
  }

  // Load next question in line
  loadQuestion() {
    this.question = this.questions[this.questionIncriment];
    this.questionNo = this.questionIncriment + 1;
    this.noOfQuestions = Object.keys(this.questions).length;
    this.questionText = this.question.Question_;
    this.incorrectPrompt = this.question.IncorrectPrompt;
    this.correctPrompt = this.question.CorrectPrompt;
    this.setAnswers();
    this.setTimer();
    this.questionIncriment = this.questionIncriment + 1;
  }

  // Put answers on screen
  buildAnswerDisplay(answer){
    // Generate Answer
    let parent = <HTMLDivElement>document.getElementById('answers');
    let button = document.createElement("button");
    let text = document.createTextNode(answer.AnswerText);
    button.classList.add('answer');
    button.appendChild(text);
    button.setAttribute('id','answer-' + answer.AnswerId);
    parent.appendChild(button);
  }

  // Answer Correctly
  answerQuestionCorrectly(answer) {
    let answerButton = <HTMLButtonElement>document.getElementById('answer-' + answer.AnswerId);
    answerButton.addEventListener('click', (event) => {
      // Show Prompt
      this.correctAlert(this.correctPrompt);
      // Increase the score
      this.currentScore = this.currentScore + this.countdown;
      // Set up quiz review
      var correct = answer.AnswerText;
      var qTrack = {no: this.questionNo, q: this.questionText, a: answer.AnswerText, c: correct}
      this.review.push(qTrack);
      // Check for end of questions
      if (this.questionNo < this.noOfQuestions) {
        // Remove the old answers
        var parent = document.getElementById('answers');
        this.answers.forEach(element => {
          var button = <HTMLButtonElement>document.getElementById('answer-' + element.AnswerId);
          parent.removeChild(button);
        });
        // Re-init the timer
        this.timer.initTimer();
        // Load Next Question
        this.loadQuestion();
      } else {
        // End the Quiz
        this.endOfQuiz();
      }
    });
  }

  // Answer Incorrectly
  answerQuestionIncorrectly(answer) {
    let answerButton = <HTMLButtonElement>document.getElementById('answer-' + answer.AnswerId);
    answerButton.addEventListener('click', (event) => {
      // Show Prompt
      this.incorrectAlert(this.incorrectPrompt);
      // Set up quiz review
      var correct;
      this.answers.forEach(element => {
        if (element.marker) {
          correct = element.AnswerText;
        }
      });
      var qTrack = {no: this.questionNo, q: this.questionText, a: answer.AnswerText, c: correct}
      this.review.push(qTrack);
      // Check for end of quiz
      if (this.questionNo < this.noOfQuestions) {
        // Remove the old answers from the page
        var parent = document.getElementById('answers');
        this.answers.forEach(element => {
          var button = <HTMLButtonElement>document.getElementById('answer-' + element.AnswerId);
          parent.removeChild(button);
        });
        // Re-init the timer
        this.timer.initTimer();
        // Load Next Question
        this.loadQuestion();
      } else {
        // End the Quiz
        this.endOfQuiz();
      }
    });
  }

  // Well done message, shown on answering correctly
  correctAlert(prompt) {
    let alert = this.alertCtrl.create({
      title: "Hoot! Well done!",
      subTitle: prompt,
      buttons: ['Ok']
    });
    alert.present();
  }

  // Encouragement message, shown on answering correctly
  incorrectAlert(prompt) {
    let alert = this.alertCtrl.create({
      title: "Screech! Keep going!",
      subTitle: prompt,
      buttons: ['Ok']
    });
    alert.present();
  }

  // End the Quiz
  endOfQuiz() {
    // Pass user score up to the DB (edit existing record)
    // Move to End Quiz Screen (w/ quiz stats)
  }

}
