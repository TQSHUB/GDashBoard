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
}