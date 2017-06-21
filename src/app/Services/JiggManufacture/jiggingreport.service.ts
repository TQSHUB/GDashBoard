import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class JiggingReportService{
    constructor(private http: Http){
        console.log('Jigging Report Service Started');
    }
    
    getBindItems_ByAliasName()
    {
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res => res.json());
    }

    getBindCustomer_ByName()
    {
        return this.http.get(host + 'PPCController/getBindCustomer_ByName')
            .map(res => res.json());
    }

    getJiggingDetailData(fromdate:string, todate:string,  alias_names: string, customer_names: string, natofcomp: string, itemtype: string,  loadingshift: string)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            FromDate: fromdate,
            ToDate: todate,
            Alias_Names: alias_names,
            Customer_Names: customer_names,            
            NatOfComp: natofcomp,
            ItemType: itemtype,
            Shift: loadingshift
        });
        return this.http.post( host +'JiggingDetail/getJiggingDetailData',body,{headers:headers})
            .map(res => res.json());
    }
}