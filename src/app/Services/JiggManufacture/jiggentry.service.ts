import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class JiggMfgEntry  {
   
   host: string = '192.168.56.1';
    constructor(private http: Http){
    }

    getAllItem(){
            return this.http.get(host + 'PPCController/getBindItems_ByAliasName')
            .map(res=>res.json());
        }

    getAllJiggCode(id : string){
        console.log(id);    
        return this.http.get(host + 'JigMfg/jiggdata/' + id)
        .map(res=>res.json());
         /*return this.http.delete('http://'+ this.host +'/galvaapi/api/JiggMst/jiggdata/' + id)
        .map(res => res.json());*/
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

    addNewJigg(itemid :string,jiggcode:string,purpose:string,dpdoj:string,coatingpunturebase:string,coatingskip:string,setting:string,pinhole:string,jiggband:string,contactbroken:string,jiggbroken:string,contactabression:string,coatingonpuntureonjigg:string,contactburn:string,coatingburn:string,others:string,ecn:string,TotalTechnicalDefects:string,TotalHandlingDefects:string,flag:string,jiggmst:string,UserName:string){
             var headers = new Headers();
             headers.append('Authorization','Bearer');
             headers.append('Content-Type','Application/Json');

             var body = JSON.stringify({
                 item_id : itemid,
                 jigg_code : jiggcode,
                 coating_punc_base : coatingpunturebase,
                 purpose : purpose,
                 recdate : dpdoj,
                 ECN : ecn,
                 coating_skip : coatingskip,
                 setting_change : setting,
                 pin_hole : pinhole,
                 jigg_bend : jiggband,
                 contact_broken : contactbroken,
                 jigg_broken : jiggbroken,
                 contact_abression : contactabression,
                 coating_punture :coatingonpuntureonjigg,
                 contact_burn : contactburn,
                 coating_burn : coatingburn,
                 other : others,
                 tot_handling_defect : TotalHandlingDefects,
                 tot_tech_defect : TotalTechnicalDefects,
                 flag : flag,
                 Jiggmst : jiggmst,
                 user : UserName,
             })
              return this.http.post(host +'/JigMfgEntry/insertjiggdata',body,{headers:headers})
            .map(res=>res.json());
    }

    UpdateJigg(itemid :string,jiggcode:string,purpose:string,dpdoj:string,CoatingPuntureBase:string,CPSKIP:string,SETTING:string,PinHole:string,JiggBand:string,ContactBroken:string,JiggBroken:string,Contactabression:string,CoatingonPuntureonJigg:string,ContactBurn:string,CoatingBurn:string,Others:string,ECN:string,TotalTechnicalDefects:string,TotalHandlingDefects:string,flag:string,newJigg:string){
             var headers = new Headers();
             headers.append('Authorization','Bearer');
             headers.append('Content-Type','Application/Json');

             var body = JSON.stringify({
                 item_id : itemid,
                 jigg_code : jiggcode,
                 coating_punc_base : CoatingPuntureBase,
                 purpose : purpose,
                 rectdate : dpdoj,
                 ECN : ECN,
                 coating_skip : CPSKIP,
                 setting_change : SETTING,
                 pin_hole : PinHole,
                 jigg_bend : JiggBand,
                 contact_broken : ContactBroken,
                 jigg_broken : JiggBroken,
                 contact_abression : Contactabression,
                 coating_punture :CoatingonPuntureonJigg,
                 contact_burn : ContactBurn,
                 coating_burn : CoatingBurn,
                 other : Others,
                 tot_handling_defect : TotalHandlingDefects,
                 tot_tech_defect : TotalTechnicalDefects,
                 flag : flag, 
                 old_jigg : jiggcode,
                 New_Jigg : newJigg
             })
              return this.http.post(host +'JigMfgEntry/insertjiggdatarectified',body,{headers:headers})
            .map(res=>res.json());
    }

    
}