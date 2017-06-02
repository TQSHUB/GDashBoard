import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/catch';

@Injectable()
    export class ItemService{
       
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
            return this.http.post(host +'Item/Inseritem',body,{headers:headers})
            .map(res=>res.json());
        }

       updateItem(code :string, aliasname:string, componentname:string, rate:string, natureofcomponent:string, roundqty:string, uom:string, natureofplating:string){
             var headers = new Headers();
             headers.append('Authorization','Bearer');
             headers.append('Content-Type','Application/Json');

            var body = JSON.stringify({
                Code : code,
                Alias_Name : aliasname,
                Component_Name : componentname,
                Rate : rate,
                Nature_of_Comp : natureofcomponent,
                Round_Qty : roundqty,
                Uom : uom,
                Nature_of_Plating : natureofplating
            });
            return this.http.put(host +'Item/Updateitem',body,{headers:headers})
            .map(res=>res.json());
        }

        getAllItem(){
            return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res=>res.json());
        }

    }