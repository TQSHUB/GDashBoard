import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/catch';

@Injectable()
    export class FrmLoadingService{

    constructor(private http:Http){}

    getAllItem(){
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName/')
        .map(res => res.json());
    }

    getFrmLoading(fromdate:string , todate:string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

         var body = JSON.stringify({
            FromDate: fromdate,
            ToDate: todate,
        });
        return this.http.post( host +'ItemController/getLFrmLoading',body,{headers:headers})
            .map(res => res.json());
    }

    updateFrmloading(item_code:string,qty:String){
         var headers = new Headers();
             headers.append('Authorization','Bearer');
             headers.append('Content-Type','Application/Json');

              var body = JSON.stringify({
                Item_Code : item_code,
                Qty : qty,
            });
             return this.http.put(host +'ItemController/updatefrmloading',body,{headers:headers})
            .map(res=>res.json());
    }

    
}