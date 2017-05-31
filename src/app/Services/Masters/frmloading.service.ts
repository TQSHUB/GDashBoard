import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/catch';

@Injectable()
    export class FrmLoadingService{

    constructor(private http:Http){}

    getAllItem(){
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName/')
        .map(res => res.json());
    }
}