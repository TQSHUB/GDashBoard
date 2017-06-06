import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class CSDashboardService{
    constructor(private http: Http){
        //console.log("ppc service service...")
    }

    getMonthlySummary(month: string, natureofcomp: string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Month: month,
            NatureOfComp: natureofcomp
        });

        return this.http.post( host +'PPCController/PPCSummary',body,{headers:headers})
            .map(res => res.json());
    }
}