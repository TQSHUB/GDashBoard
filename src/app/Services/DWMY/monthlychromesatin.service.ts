import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class MonthlyService{
    constructor(private http: Http){
    }
    GetMonthlyInspection(type: string){
        return this.http.get( host +'DMWYController/GetMonthlyInspection/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetMonthlyRoundNo(type: string){
        return this.http.get( host +'DMWYController/GetMonthlyRoundNo/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetMonthlyPending(type: string){
        return this.http.get( host +'DMWYController/GetMonthlyPending/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetMonthlyEmptyRound(type: string){
        return this.http.get( host +'DMWYController/GetMonthlyEmptyRound/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetMonthlyTopRejectionDefect(type: string){
        return this.http.get( host +'DMWYController/GetMonthlyTopRejectionDefect/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetMonthlyRejectionDefects(type: string){
        return this.http.get( host +'DMWYController/GetMonthlyRejectionDefects/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetMonthlyDefects(type: string){
        return this.http.get( host +'DMWYController/GetMonthlyDefects/' + type + '/' + localStorage.getItem('Month') + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetLegents(param: string, time: string){
        return this.http.get( host +'DMWYController/GetLegents/' + param + '/' + time)
            .map(res => res.json());
    }
}
