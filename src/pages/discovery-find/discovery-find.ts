import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as _ from 'lodash';

import { WildWalkApi } from "../../app/shared/shared";
import { Headers, RequestOptions, Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-discovery-find',
  templateUrl: 'discovery-find.html',
})
export class DiscoveryFind {
    
  handleError: any;
  section: any;
  private allResidents : any;
  private allResidentsAlphabet : any;
  residents = [];
  private apiurl : any;
  queryResidents : string;

  constructor(public navCtrl: NavController, private wwapi: WildWalkApi, public navParams: NavParams, private http: Http, private alertCtrl: AlertController, private loadingController: LoadingController) {
    this.section = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoveryFind');

    // Base api url
    this.apiurl = this.wwapi.baseUrl;

    // Loader
    let loader = this.loadingController.create({
      content: 'Rounding up the ' + this.section
    });
    loader.present().then(() => {
        // Get the list of residents
        this.wwapi.getRepoData('discovery/find/' + this.section).subscribe(data => {
        this.allResidents = data;
        this.allResidentsAlphabet = _.chain(data).groupBy('Species').toPairs().map(item => _.zipObject(['SpeciesName', 'Species'], item)).value();
        this.residents = this.allResidentsAlphabet;
        console.log(this.residents);
        loader.dismiss();
      });
    });
  }

  // Add resident to current users favourites
  addToFav(profileid, userid, profile) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiurl + '/discovery/addToFavourite/' + profileid + '/' + userid,'')
    .toPromise()
    .then(response => this.favAlert(profile))
    .catch(this.handleError);
  }

  // Filter Residents by search
  updateResidents() {
    let queryTextLower = this.queryResidents.toLowerCase();
    let filteredResidents = [];
    _.forEach(this.allResidentsAlphabet, td => {
      let residents = _.filter(td.Species, t => (<any>t).Name.toLowerCase().includes(queryTextLower));
      if (residents.length) {
        filteredResidents.push({ SpeciesName: td.SpeciesName, Species: residents});
      }
    });
    this.residents = filteredResidents;
  }

  // Once added show an alert confirming the add
  favAlert(resident) {
    let alert = this.alertCtrl.create({
      title: resident + ' thanks you!',
      subTitle: 'You added them to you favourites! This could be the start of something special...',
      buttons: ['Ok']
    });
    alert.present();
  }
}
