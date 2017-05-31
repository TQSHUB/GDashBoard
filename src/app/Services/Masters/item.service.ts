import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
    export class ItemService{
        host: string= '192.168.0.101';

        constructor(private http:Http){}

        addNewItem(aliasname:string, componentname:string, rate:string, natureofcomponent:string, roundqty:string, uom:string, natureofplating:string){
             var headers = new Headers();
             headers.append('Authorization','Bearer');
             headers.append('Content-Type','Application/Json');

            var body = JSON.stringify({
                Alias_Name : aliasname,
                Component_Name : componentname,
                Rate : rate,
                Nature_of_Comp : natureofcomponent,
                Round_Qty : roundqty,
                Uom : uom,
                Nature_of_Plating : natureofplating
            });
            return this.http.post('http://'+ this.host +'/galvaapi/api/Item/Inseritem',body,{headers:headers})
            .map(res=>res.json());
        }

    }