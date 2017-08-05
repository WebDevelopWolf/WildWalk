import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizQuestion } from './quiz-question';

@NgModule({
  declarations: [
    QuizQuestion,
  ],
  imports: [
    IonicPageModule.forChild(QuizQuestion),
  ],
  exports: [
    QuizQuestion
  ]
})
export class QuizQuestionModule {}
