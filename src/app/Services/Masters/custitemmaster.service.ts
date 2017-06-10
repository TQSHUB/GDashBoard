import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import { host } from '../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class CustomerItemMasterService{
    host: string = 'http://192.168.0.105';
    host1: string = 'http://202.71.9.14:4002';
    constructor(private http: Http){
        console.log('Customer Item Master service started...');
    }

    /*addNewCustomerItem(customername: string, itemname: string)
    {
        var headers = new Headers();

        headers.append('Authorization','Bearer');
        headers.append('Content-Type','Application/Json');
        
        var body = JSON.stringify({
            Name: customername,
            Alias_Name: itemname
        });
        return this.http.post(this.host + '/Customerapi/api/customer/getallcustomers',body,{headers: headers})
            .map(res => res.json);
    }*/

    getAllCustomers()
    {
        return this.http.get(this.host + '/Customerapi/api/customer/getallcustomers/')
            .map(res => res.json());
    }

    getAllItems()
    {
        return this.http.get(this.host1 + '/api/PPCController/getBindItems_ByAliasName/')
            .map(res => res.json());
    }
}