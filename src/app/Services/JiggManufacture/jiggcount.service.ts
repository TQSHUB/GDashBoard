import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/catch';

@Injectable()

export class JiggCountData{
    
     constructor(private http:Http){}
    
    getBindItems_ByAliasName(){
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res => res.json());
    }

    getJiggCode(){
         return this.http.get(host + 'JiggManufature/jiggcount')
            .map(res => res.json());
    }

    getJigCount(jigcode:string,alias_name:string){
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

         var body = JSON.stringify({
            Alias_Names: alias_name,
            JigCode: jigcode,
        });
        return this.http.post( host +'JiggManufature/getjiggcountdata',body,{headers:headers})
            .map(res => res.json());
    }
}