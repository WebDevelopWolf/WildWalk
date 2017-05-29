import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WildWalkApi {

    public baseUrl = 'http://localhost:52877/api/';
    currentRepos: any = {};

    constructor(private http: Http) {}

    getRepoData(url) : Observable<any> {
        return this.http.get(this.baseUrl + url)
            .map((response: Response) => {
                this.currentRepos = response.json();
                return this.currentRepos;
            });
    }

}