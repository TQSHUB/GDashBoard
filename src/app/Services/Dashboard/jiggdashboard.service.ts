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
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgNew')
            .map(res => res.json());
    }
    getMonthlyMfgDesign(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgDesign')
            .map(res => res.json());
    }
    getMonthlyMfgRepair(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgRepair')
            .map(res => res.json());
    }
    getMonthlyMfgScrape(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgScrape')
            .map(res => res.json());
    }
    getMonthlyMfgRectify(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyMfgRectify')
            .map(res => res.json());
    }
    getMonthlyJiggRoundChrome(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyJiggRoundChrome')
            .map(res => res.json());
    }
    getMonthlyJiggRoundSatin(){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyJiggRoundSatin')
            .map(res => res.json());
    }
    getMonthlyRoundNoJigg(type: string){
        return this.http.get( host +'DashboardPrimaryController/GetMonthlyRoundNoJigg/' + type)
            .map(res => res.json());
    }
    getTop10Jigg(){
        return this.http.get( host +'DashboardPrimaryController/Top10Jigg')
            .map(res => res.json());
    }
}