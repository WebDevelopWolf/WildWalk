import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { HomeLoggedIn } from '../pages/home-logged-in/home-logged-in';
import { Register } from '../pages/register/register';
import { Discovery } from '../pages/discovery/discovery';
import { DiscoveryFind } from '../pages/discovery-find/discovery-find';
import { DiscoveryResident } from '../pages/discovery-resident/discovery-resident';
import { QuizHome } from '../pages/quiz-home/quiz-home';
import { QuizQuestion } from '../pages/quiz-question/quiz-question';

import { TimerComponent } from './timer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    HomeLoggedIn,
    Register,
    Discovery,
    DiscoveryFind,
    DiscoveryResident,
    QuizHome,
    QuizQuestion,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    HomeLoggedIn,
    Register,
    Discovery,
    DiscoveryFind,
    DiscoveryResident,
    QuizHome,
    QuizQuestion,
    TimerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
