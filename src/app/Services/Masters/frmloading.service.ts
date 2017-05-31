import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
    export class FrmLoadingService{

    host : string ='202.71.9.14:4002';
    constructor(private http:Http){}

    getAllItem(){
        return this.http.get('http://'+ this.host + '/api/PPCController/getBindItems_ByAliasName/')
        .map(res => res.json());
    }
}