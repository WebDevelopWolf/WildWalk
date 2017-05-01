import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WildWalkApi {

    private baseUrl = 'https://i2test-ea07c.firebaseio.com/';
    private gitUrl = "https://api.github.com/search/repositories?q=user:";
    currentRepos: any = {};

    constructor(private http: Http) {}

    getLoginTest(){
        return new Promise(resolve => {
            this.http.get(this.baseUrl + 'login.json')
                .subscribe(res => resolve(res.json()));
        });
    }

    getRepoData(login) : Observable<any> {
        return this.http.get(this.gitUrl + login)
            .map((response: Response) => {
                this.currentRepos = response.json();
                return this.currentRepos;
            });
    }

}