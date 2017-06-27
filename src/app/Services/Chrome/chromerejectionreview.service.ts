import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ChromeRejectionReviewService{
    constructor(private http: Http){
        console.log('Chrome Rejection Review Service Started');
    }

    getBindItems_ByAliasName(displaydate: string, linetype: string, alias_name: string)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Formatdt: displaydate,
            LineType: linetype,
            Alias_Name: alias_name
        });
        return this.http.post(host + 'ChromeRejectionReview/getBindItems_ByAliasName',body,{headers:headers})
            .map(res => res.json());
    }

    bindalldata(loadingdate: string, alias_name: string)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            LoadingDate: loadingdate,
            Alias_Names: alias_name
        });
        return this.http.post(host + 'ChromeRejectionReview/bindalldata',body,{headers:headers})
            .map(res => res.json());
    }

    bindrejectionData(loadingdate: string, alias_name: string, rejectiontype: string)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            LoadingDate: loadingdate,
            Alias_Names: alias_name,
            RejectionType: rejectiontype
        });

        return this.http.post(host + 'ChromeRejectionReview/bindrejectionData',body,{headers:headers})
            .map(res => res.json());
    }

    search(displaydate: string, linetype: string, alias_name)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Formatdt: displaydate,
            LineType: linetype,
            Alias_Name: alias_name
        });
        return this.http.post(host + 'ChromeRejectionReview/getBindItems_ByAliasName',body,{headers:headers})
            .map(res => res.json());
    }

    insertData(todaydate: string, itemcode: string, formatdate: string, rejtype: string, okqty:string, holdqty:string, bufferqty:string,
     rejqty: string, piting:string, pinhole:string, dent:string, handmourej:string, nklshow:string, 
     ptchmrks:string, scrtchmrks:string, rghns:string, crbrn:string, othr:string, slvrmrk:string, 
     mldrej:string, skpltng:string, coprbrng:string, warpg:string, whtmrk:string, dotplstc:string, 
     wtrmrk:string, blstr:string, jigdmg:string, rmrk:string)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Modify_Date: todaydate,
            Item_Code: itemcode,
            OK_Qty: okqty,
            Hold_Qty: holdqty,
            Buffering_Qty: bufferqty,
            Rejected_Qty: rejqty,
            Pitting: piting,
            Pin_Hole: pinhole,
            Dent: dent,
            Hand_Mou_Rej: handmourej,
            Nickle_Show_g: nklshow,
            Patch_Marks: ptchmrks,
            Scratch_Marks: scrtchmrks,
            Roughness: rghns,
            Cr_Burn: crbrn,
            Other: othr,
            Silver_Mark: slvrmrk,
            Moulding_Rej: mldrej,
            Skip_Plating: skpltng,
            Copper_Burning: coprbrng,
            War_Page: warpg,
            White_Mark: whtmrk,
            Dot_Plastic: dotplstc,
            Water_Mark: wtrmrk,
            Blister: blstr,
            Jig_Damage: jigdmg,
            Remark: rmrk,
            Loading_Date: formatdate,
            Rejection_type: rejtype
        });
        return this.http.post( host +'ChromeRejectionReview/InsertData',body,{headers:headers})
            .map(res => res.json());
    }

    updateData(formatdate: string, itemcode: string, okqty:string, holdqty:string, bufferqty:string,
     rejqty: string, piting:string, pinhole:string, dent:string, handmourej:string, nklshow:string, 
     ptchmrks:string, scrtchmrks:string, rghns:string, crbrn:string, othr:string, slvrmrk:string, 
     mldrej:string, skpltng:string, coprbrng:string, warpg:string, whtmrk:string, dotplstc:string, 
     wtrmrk:string, blstr:string, jigdmg:string, rmrk:string)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Loading_Date: formatdate,
            Item_Code: itemcode,
            OK_Qty: okqty,
            Hold_Qty: holdqty,
            Buffering_Qty: bufferqty,
            Rejected_Qty: rejqty,
            Pitting: piting,
            Pin_Hole: pinhole,
            Dent: dent,
            Hand_Mou_Rej: handmourej,
            Nickle_Show_g: nklshow,
            Patch_Marks: ptchmrks,
            Scratch_Marks: scrtchmrks,
            Roughness: rghns,
            Cr_Burn: crbrn,
            Other: othr,
            Silver_Mark: slvrmrk,
            Moulding_Rej: mldrej,
            Skip_Plating: skpltng,
            Copper_Burning: coprbrng,
            War_Page: warpg,
            White_Mark: whtmrk,
            Dot_Plastic: dotplstc,
            Water_Mark: wtrmrk,
            Blister: blstr,
            Jig_Damage: jigdmg,
            Remark: rmrk            
        });
        return this.http.post( host +'ChromeRejectionReview/UpdateData',body,{headers:headers})
            .map(res => res.json());
    }
}