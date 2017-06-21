import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class YearlyService{
    constructor(private http: Http){
    }
    GetYearlyInspection(param: string){
        return this.http.get( host +'DMWYController/GetYearlyInspection/' + param + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetYearlyRoundNo(param: string){
        return this.http.get( host +'DMWYController/GetYearlyRoundNo/' + param + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetYearlyPending(param: string){
        return this.http.get( host +'DMWYController/GetYearlyPending/' + param + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetYearlyEmptyRound(param: string){
        return this.http.get( host +'DMWYController/GetYearlyEmptyRound/' + param + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetYearlyRejectionDefects(param: string){
        return this.http.get( host +'DMWYController/GetYearlyRejectionDefects/' + param + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetYearTopRejectionDefect(param: string){
        return this.http.get( host +'DMWYController/GetYearTopRejectionDefect/' + param + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetYearlyDefects(param: string){
        return this.http.get( host +'DMWYController/GetYearlyDefects/' + param + '/' + localStorage.getItem('Year'))
            .map(res => res.json());
    }
    GetLegents(param: string, time: string){
        return this.http.get( host +'DMWYController/GetLegents/' + param + '/' + time)
            .map(res => res.json());
    }
}
