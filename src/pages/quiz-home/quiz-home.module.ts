import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizHome } from './quiz-home';

@NgModule({
  declarations: [
    QuizHome,
  ],
  imports: [
    IonicPageModule.forChild(QuizHome),
  ],
  exports: [
    QuizHome
  ]
})
export class QuizHomeModule {}
