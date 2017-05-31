import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import { host } from '../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class JigMasterService{
    host1: string = 'http://202.71.9.14:4002';
    constructor(private http: Http){
        console.log('Jig Master service started');        
    }

    getAllItems()
    {
        return this.http.get(this.host1 + '/api/PPCController/getBindItems_ByAliasName/')
            .map(res => res.json());
    }
}