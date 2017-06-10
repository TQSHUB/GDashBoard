import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class JiggDashboardService{
    constructor(private http: Http){
        //console.log("ppc service service...")
    }

    getMonthlyMfgNew(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgNew/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getMonthlyMfgDesign(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgDesign/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getMonthlyMfgRepair(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgRepair/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getMonthlyMfgScrape(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgScrape/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getMonthlyMfgRectify(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgRectify/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getMonthlyJiggRoundChrome(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyJiggRoundChrome/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getMonthlyJiggRoundSatin(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyJiggRoundSatin/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getMonthlyRoundNoJigg(type: string){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyRoundNoJigg/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    getTop10Jigg(){
        return this.http.get( host +'DashboardPrimaryController/Top10Jigg')
            .map(res => res.json());
    }
}