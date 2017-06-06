import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/catch';

@Injectable()

export class Loading{
    
     constructor(private http:Http){}
    
    getLoadingData(fromdate:string , todate:string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

         var body = JSON.stringify({
            FromDate: fromdate,
            ToDate: todate,
        });
        return this.http.post( host +'ItemController/getLoadingData',body,{headers:headers})
            .map(res => res.json());
    }
}