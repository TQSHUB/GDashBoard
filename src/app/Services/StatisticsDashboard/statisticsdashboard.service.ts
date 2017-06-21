import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class StatisticsDashboardService{
    constructor(private http: Http){
        // console.log('service started...');
    }
    getPPCDaily(fromdate, todate){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Month: '',
            FromDate: fromdate,
            ToDate: todate,
            ItemType: '',
            NatOfComp: '',
            Alias_Names: '',
            Customer_Names: '',
        });

        return this.http.post( host +'StatisticsDashboardController/getPPCDailyReport',body,{headers:headers})
            .map(res => res.json());
    }
    getJiggDaily(fromdate, todate){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Shift: '',
            FromDate: fromdate,
            ToDate: todate,
            ItemType: '',
            NatOfComp: '',
            Alias_Names: '',
            Customer_Names: '',
        });

        return this.http.post( host +'StatisticsDashboardController/getJiggingDetailData',body,{headers:headers})
            .map(res => res.json());
    }
    GetDailyInspection(param: string){
        return this.http.get( host +'DMWYController/GetDailyInspection/' + param)
            .map(res => res.json());
    }
    GetDailyRoundNo(param: string){
        return this.http.get( host +'DMWYController/GetDailyRoundNo/' + param)
            .map(res => res.json());
    }
    GetDailyPending(param: string){
        return this.http.get( host +'DMWYController/GetDailyPending/' + param)
            .map(res => res.json());
    }
    GetDailyEmptyRound(param: string){
        return this.http.get( host +'DMWYController/GetDailyEmptyRound/' + param)
            .map(res => res.json());
    }
}
