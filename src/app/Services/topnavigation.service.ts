import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class TopNavigationService{
    constructor(private http: Http){
        // console.log('service started...');
    }

    getNavigationPages(username: string){
        return this.http.get( host + 'bindnavigation/getnavigationpages/' + username)
            .map(res => res.json());
    }

}
