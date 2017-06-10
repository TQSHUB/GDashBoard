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

    getMonthlyInspection(type: string){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyInspection/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getMonthlyRoundNo(type: string){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyRoundNo/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetMonthlyPending(type: string){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyPending/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetMonthlyEmptyRound(type: string){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyEmptyRound/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    LoadingChromeData(){
        return this.http.get( host +'DashboardPrimaryController/LoadingChromeData')
            .map(res => res.json());
    }
    LoadingSatinData(){
        return this.http.get( host +'DashboardPrimaryController/LoadingSatinData')
            .map(res => res.json());
    }
}