import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { WildWalkApi } from "../../app/shared/shared";
import { Headers, RequestOptions, Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-discovery-resident',
  templateUrl: 'discovery-resident.html',
})
export class DiscoveryResident {

  handleError: any;
  id: any;
  resident: any;
  private apiurl : any;
  picture: any;
  section: any;
  name: any;
  age: any;
  ageInWild: any;
  food: any;
  foodInWild: any;
  height: any;
  weight: any;
  about: any;
  habitat:any;
  avgHeight: any;
  avgWeight: any;
  sizegraphic: any;
  story: any;
  didyouknow: any; 
  adoptGraphic: any;
  userid: any;
  likes: any;

  constructor(public navCtrl: NavController, private wwapi: WildWalkApi, public navParams: NavParams, private http: Http, private alertCtrl: AlertController) {
    this.id = this.navParams.data;
    this.userid = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoveryResident - Resident loading: ' + this.id);

    // Base api url
    this.apiurl = this.wwapi.baseUrl;
    this.wwapi.getRepoData('discovery/resident/' + this.id).subscribe(data => {
        this.resident = data;
        this.picture = data.Picture;
        this.section = data.Discoveryid;
        this.name = data.Name;
        this.age = data.Age;
        this.ageInWild = data.Ageinwild;
        this.food = data.Food;
        this.foodInWild = data.Foodinwild;
        this.height = data.Height;
        this.weight = data.Weight;
        this.about = data.About;
        this.habitat = data.Habitat;
        this.avgHeight = data.Avgheight;
        this.avgWeight = data.Avgweight;
        this.sizegraphic = data.Sizegraphic;
        this.story = data.Story;
        this.likes = data.Likes;
        this.wwapi.getRepoData('discovery/dyk/' + data.Profileid).subscribe(dyk => {
          this.didyouknow = dyk;
        })
      });
  }

  // Add resident to current users favourites
  addToFav() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiurl + '/discovery/addToFavourite/' + this.id + '/' + this.userid,'')
    .toPromise()
    .then(response => this.favAlert())
    .catch(this.handleError);
  }

  // Add resident to current users favourites
  likeResident() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiurl + '/discovery/likeResident/' + this.id, '')
    .toPromise()
    .then(response => this.likeAlert())
    .catch(this.handleError);
  }

  // Once added show an alert confirming the add
  favAlert() {
    let alert = this.alertCtrl.create({
      title: this.name + ' thanks you!',
      subTitle: 'You added them to you favourites! This could be the start of something special...',
      buttons: ['Ok']
    });
    alert.present();
  }

  likeAlert() {
    this.likes++;
    let alert = this.alertCtrl.create({
      title: 'Awww, ' + this.name + ' likes you too!',
      subTitle: this.name + ' has ' + this.likes + ' likes now!',
      buttons: ['Ok']
    });
    alert.present();
  }

}
