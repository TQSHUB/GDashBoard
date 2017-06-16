import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class JigMasterService{
    //host1: string = 'http://202.71.9.14:4002';
    constructor(private http: Http){
        console.log('Jig Master service started');        
    }

    getAllItems()
    {
        return this.http.get(host + 'PPCController/getBindItems_ByAliasName/')
            .map(res => res.json());
    }

    getAllJiggMstData()
    {
        return this.http.get(host + 'JiggMst/getallJiggMstData/')
            .map(res => res.json());
    }

    getAllJiggMstDataAliasnames()
    {
        return this.http.get(host + 'JiggMst/getalljiggmstDataAliasnames/')
            .map(res => res.json());
    }

    addNewJiggandItemNames(jiggname: string, itemid: string)
    {
        var headers = new Headers();

        headers.append('Authorization','Bearer');
        headers.append('Content-Type','Application/Json')

        var body = JSON.stringify({
            Jig_Code: jiggname,
            Item_Id: itemid
        });
        return this.http.post(host + 'JiggMst/InsertJiggItemNames',body,{headers: headers})
            .map(res => res.json());
    }

    updateNewJiggandItemNames(Item_id: string, jiggname: string, ID: string)
    {
        var headers = new Headers();

        headers.append('Authorization','Bearer');
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Item_Id: Item_id,
            Jig_Code: jiggname,
            Id: ID
        });
        return this.http.put(host + 'JiggMst/UpdateJiggItemNames',body,{headers: headers})
            .map(res => res.json());
    }

    deleteJiggandItemNames(id: string)
    {
        var headers = new Headers();

        headers.append('Authorization','Bearer');
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Id: id
        });

        return this.http.delete(host + 'JiggMst/DeleteJiggItemNames/' + id)
            .map(res => res.json());
    }
}