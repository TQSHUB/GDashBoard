import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class PPCDashboardService{
    constructor(private http: Http){
        //console.log("ppc service service...")
    }
    getPpcMonthlyChartChrome(){
        return this.http.get( host +'DashboardPrimaryController/getPpcMonthlyChartChrome')
            .map(res => res.json());
    }
    getPpcMonthlyChartSatin(){
        return this.http.get( host +'DashboardPrimaryController/getPpcMonthlyChartSatin')
            .map(res => res.json());
    }
}