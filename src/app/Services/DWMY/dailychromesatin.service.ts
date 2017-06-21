import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class DailyService{
    constructor(private http: Http){
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
    GetDailyRejectionDefect(param: string){
        return this.http.get( host +'DMWYController/GetDailyRejectionDefect/' + param)
            .map(res => res.json());
    }
    GetDailyTopRejectionDefect(param: string){
        return this.http.get( host +'DMWYController/GetDailyTopRejectionDefect/' + param)
            .map(res => res.json());
    }
    GetDailyDefects(param: string){
        return this.http.get( host +'DMWYController/GetDailyDefects/' + param)
            .map(res => res.json());
    }
    GetLegents(param: string, time: string){
        return this.http.get( host +'DMWYController/GetLegents/' + param + '/' + time)
            .map(res => res.json());
    }
}
