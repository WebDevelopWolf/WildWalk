import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiscoveryFind } from '../discovery-find/discovery-find';
import { QuizHome } from '../quiz-home/quiz-home';

@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class Discovery {

  section: any;
  title: string;
  sectionBack: string;
  intro: string;
  plural: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.section = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Discovery - ' + this.section);
    if(this.section === "mammals") {
      this.title = "Mammals";
      this.intro = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit nunc, vehicula vitae congue quis, efficitur id odio. Donec vestibulum at ante quis vehicula. Aenean vel ullamcorper lectus. Donec posuere elementum tellus fermentum ultricies. Nullam vel massa eleifend, venenatis elit vel, egestas diam.";
      this.sectionBack = "assets/img/discovery/mammalsHeading.png";
      this.plural = "mammal";
    } else if(this.section === "birds") {
      this.title = "Birds";
      this.intro = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit nunc, vehicula vitae congue quis, efficitur id odio. Donec vestibulum at ante quis vehicula. Aenean vel ullamcorper lectus. Donec posuere elementum tellus fermentum ultricies. Nullam vel massa eleifend, venenatis elit vel, egestas diam.";
      this.sectionBack = "assets/img/discovery/birdsHeading.png";
      this.plural = "bird";
    } else if(this.section === "reptiles") {
      this.title = "Reptiles";
      this.intro = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit nunc, vehicula vitae congue quis, efficitur id odio. Donec vestibulum at ante quis vehicula. Aenean vel ullamcorper lectus. Donec posuere elementum tellus fermentum ultricies. Nullam vel massa eleifend, venenatis elit vel, egestas diam.";
      this.sectionBack = "assets/img/discovery/reptilesHeading.png";
      this.plural = "reptile";
    } else if(this.section === "invertebrates") {
      this.title = "Invertebrates";
      this.intro = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit nunc, vehicula vitae congue quis, efficitur id odio. Donec vestibulum at ante quis vehicula. Aenean vel ullamcorper lectus. Donec posuere elementum tellus fermentum ultricies. Nullam vel massa eleifend, venenatis elit vel, egestas diam.";
      this.sectionBack = "assets/img/discovery/invertsHeading.png";
      this.plural = "invertebrate";
    }
  }

  // Wire up Find Button
  DiscoveryFind($event, section) {
    this.navCtrl.setRoot(DiscoveryFind, section);
  }

  // Wire up Discovery Buttons
  DiscoveryQuiz($event, section) {
    this.navCtrl.setRoot(QuizHome, section);
  }

}
