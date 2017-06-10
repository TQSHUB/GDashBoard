import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class JiggMfgEntry  {
   
    constructor(private http: Http){
    }

    getAllItem(){
            return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res=>res.json());
        }

    getAllJiggCode(id : string){
        return this.http.get(host + 'JigMfgEntry/getjiggcode/' + id)
        .map(res=>res.json());
    }

    getjiggdata(cmbsearch:string , ddljigg:string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

         var body = JSON.stringify({
            cmbsearch: cmbsearch,
            ddljigg: ddljigg,
        });
        return this.http.put( host +'JigMfgEntry/getjiggData',body,{headers:headers})
            .map(res => res.json());
    }

    
}