import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ScheduleEditService{
    constructor(private http: Http){
        console.log("scheduleedit service...")
    }

    getBindItems_ByAliasName(){
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res => res.json());
    }
    getBindCustomer_ByName(){
        return this.http.get(host + 'PPCController/getBindCustomer_ByName')
            .map(res => res.json());
    }
    getScheduleEditData(month:string, fromdate:string, todate:string, itemtype: string, natofcomp: string, alias_names: string, customer_names: string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Month: month,
            FromDate: fromdate,
            ToDate: todate,
            ItemType: itemtype,
            NatOfComp: natofcomp,
            Alias_Names: alias_names,
            Customer_Names: customer_names,
        });

        return this.http.post( host +'PPCController/getScheduleEditData',body,{headers:headers})
            .map(res => res.json());
    }
    getAllData(){
        return this.http.get(host + 'PPCController/getAllData')
            .map(res => res.json());
    }
    updateCustomer(RoundReq, ScheduleQty, CustomerID, ItemID, ID){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            RoundReq: RoundReq,
            ScheduleQty: ScheduleQty,
            CustomerID: CustomerID,
            ItemID: ItemID,
            Id: ID,
        });

        return this.http.post( host +'PPCController/updateCustomer',body,{headers:headers})
            .map(res => res.json());
    }
}