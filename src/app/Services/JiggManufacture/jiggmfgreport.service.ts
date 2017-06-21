import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class JiggMfgReportService{
   
    constructor(private http: Http){
    }

    getBindItems_ByAliasName(){
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res=>res.json());
    }
    getJiggMfgReport(fromdate:string, todate:string,alias_names: string, purpose:string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Purpose: purpose,
            FromDate: fromdate,
            ToDate: todate,
            Alias_Names: alias_names,
        });

        return this.http.post( host +'JigMfg/getJiggMfgReport',body,{headers:headers})
            .map(res => res.json());
    }
    
}