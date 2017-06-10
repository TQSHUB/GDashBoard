import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class CustomerMasterService{
    //host: string = 'http://192.168.0.105';
    constructor(private http: Http){
        console.log('Customer master service started...');
    }

    getAllCustomers()
    {
        return this.http.get(host + 'customer/getallcustomers')
            .map(res => res.json());
    }
    
    addNewCustomer(customername: string, longname: string)
    {
        var headers = new Headers();

        headers.append('Authorization','Bearer');
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Name: customername,
            Name_2: longname
        });
        return this.http.post(host + 'customer/insertCustomer',body,{headers: headers})
            .map(res => res.json());
    }

    updateCustomer(code: string, customername: string, longname: string)
    {
        var headers = new Headers();

        headers.append('Authorization','Bearer');
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Code: code,
            Name: customername,
            Name_2: longname
        });
        return this.http.put(host + 'customer/UpdateCustomer',body,{headers: headers})
            .map(res => res.json());
    }
}