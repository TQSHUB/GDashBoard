import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class PPCDailyReportService{
    constructor(private http: Http){
        //console.log("ppc service service...")
    }

    getBindItems_ByAliasName(){
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res => res.json());
    }
    getBindCustomer_ByName(){
        return this.http.get(host + 'PPCController/getBindCustomer_ByName')
            .map(res => res.json());
    }

    getPPCDailyReport(month:string, fromdate:string, todate:string, itemtype: string, natofcomp: string, alias_names: string, customer_names: string,PlanedRound: string){
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
            PlanedRound : PlanedRound,
        });

        return this.http.post( host +'PPCController/getPPCDailyReport',body,{headers:headers})
            .map(res => res.json());
    }    
    updatePPCReport(Customerid,itemid,Mstatus, mqty, plana, planb, planc){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            CustomerID: Customerid,
            ItemId: itemid,
            MStatus: Mstatus,
            MQty: mqty,
            PlanA: plana,
            PlanB: planb,
            PlanC: planc,
        });

        return this.http.post( host +'PPCController/updatePPCDailyReport',body,{headers:headers})
            .map(res => res.json());
    }
}