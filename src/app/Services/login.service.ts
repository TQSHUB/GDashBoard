import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class LoginService{
    constructor(private http: Http){
        // console.log('service started...');
    }
    getLogin(username:string, password:string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Name: username,
            Password: password,
        });

        return this.http.post( host +'LoginController/getLogin',body,{headers:headers})
            .map(res => res.json());
    }
}
