import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class WeeklyService{
    constructor(private http: Http){
    }
    GetWeeklyInspection(param: string){
        return this.http.get( host +'DMWYController/GetWeeklyInspection/' + param)
            .map(res => res.json());
    }
    GetWeeklyRoundNo(param: string){
        return this.http.get( host +'DMWYController/GetWeeklyRoundNo/' + param)
            .map(res => res.json());
    }
    GetWeeklyPending(param: string){
        return this.http.get( host +'DMWYController/GetWeeklyPending/' + param)
            .map(res => res.json());
    }
    GetWeeklyEmptyRound(param: string){
        return this.http.get( host +'DMWYController/GetWeeklyEmptyRound/' + param)
            .map(res => res.json());
    }
    GetWeeklyRejectionDefects(param: string){
        return this.http.get( host +'DMWYController/GetWeeklyRejectionDefects/' + param)
            .map(res => res.json());
    }
    GetWeeklyTopRejectionDefect(param: string){
        return this.http.get( host +'DMWYController/GetWeeklyTopRejectionDefect/' + param)
            .map(res => res.json());
    }
    GetWeeklyDefects(param: string){
        return this.http.get( host +'DMWYController/GetWeeklyDefects/' + param)
            .map(res => res.json());
    }
    GetLegents(param: string, time: string){
        return this.http.get( host +'DMWYController/GetLegents/' + param + '/' + time)
            .map(res => res.json());
    }
}
