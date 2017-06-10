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
        return this.http.get( host +'DashboardPrimaryController/getPpcMonthlyChartChrome/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getPpcMonthlyChartSatin(){
        return this.http.get( host +'DashboardPrimaryController/getPpcMonthlyChartSatin/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
}