import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private wwapi: WildWalkApi, public navParams: NavParams, private http: Http) {
    this.id = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoveryResident - Resident loading: ' + this.id);

    // Base api url
    this.apiurl = this.wwapi.baseUrl;
    this.wwapi.getRepoData('discovery/resident/' + this.id).subscribe(data => {
        this.resident = data;
        console.log(this.resident);
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
      });
  }

}
