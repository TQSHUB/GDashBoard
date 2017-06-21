import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ChromeDetailService{
     
      host: string = 'http://202.71.9.14:4002';
     constructor(private http: Http){
        console.log('Chrome Detail service started');        
    }

    getChromeGrid(fromdate:string, todate:string,alias_names: string,top:string, loadingshift: string, orderby: string, orderbya:string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            FromDate: fromdate,
            ToDate: todate,
            Alias_Name: alias_names,
            Top: top,
            LoadingShift: loadingshift,
            Orderby: orderby,
            Orderby1: orderbya,
        });

        return this.http.post(host +'ChromedetailController/getChromedetail',body,{headers:headers})
            .map(res => res.json());
    }
     getBindItems_ByAliasName(){
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res => res.json());
    }
}