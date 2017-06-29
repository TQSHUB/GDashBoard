import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { host } from '../../Configurations/application.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class SatinRejectionReviewService{
    constructor(private http: Http){
        console.log('Satin Rejection Review Service Started');
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
        return this.http.post(host + 'SatinRejectionReview/getBindItems_ByAliasName',body,{headers:headers})
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
        return this.http.post(host + 'SatinRejectionReview/bindalldata',body,{headers:headers})
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

        return this.http.post(host + 'SatinRejectionReview/bindrejectionData',body,{headers:headers})
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
        return this.http.post(host + 'SatinRejectionReview/getBindItems_ByAliasName',body,{headers:headers})
            .map(res => res.json());
    }

    insertData(todaydate: string, itemcode: string, formatdate: string, rejtype: string, holdqty:string, 
    bufferqty:string, rejqty: string, okqty:string, pinhole:string, skpltng:string, handmourej:string, prcssmourej: string,  
    whtmrk:string, pinmrk:string, warpg:string,  slvrmrk:string,   dotplstc:string,  chormbrng:string, 
    dentmrks: string, scrtchs:string, coprbrng:string,  jigdmg:string, hghgloss:string, lowgloss:string, 
    shdvrtn:string, ptchmrks:string, nckl:string, rghnss:string, blstr:string, blckspt:string, satinmrk:string, 
    chmclmrk:string, tchbrng:string, othr: string, wtrmrk: string, rmrk: string)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Modify_Date: todaydate,
            Item_Code: itemcode,
            Loading_Date: formatdate,
            Rejection_type: rejtype,
            Hold_Qty: holdqty,
            Buffering_Qty: bufferqty,
            Rejected_Qty: rejqty,
            OK_Qty: okqty,
            Pin_Hole: pinhole,            
            Skip_Plating: skpltng,
            Hand_Mou_Rej: handmourej,
            Pro_Mou_Rej: prcssmourej,
            White_Mark: whtmrk,
            Pitmarks: pinmrk,
            War_Page: warpg,
            Silver_Mark: slvrmrk,
            Dot_Plastic: dotplstc,
            Chorm_Burning: chormbrng,
            Dent_Marks: dentmrks,
            Scratches: scrtchs,
            Copper_Burning: coprbrng,
            Jig_Damage: jigdmg,
            High_Gloss: hghgloss,
            Low_Gloss: lowgloss,
            Shade_Variation: shdvrtn,
            Patch_Mark: ptchmrks,
            Nickel: nckl,
            Roughness: rghnss,
            Blister: blstr,
            Black_Spot: blckspt,
            Satin_Mark: satinmrk,
            Chemical_Mark: chmclmrk,
            Touch_Burning: tchbrng,
            Other: othr,
            Water_Mark: wtrmrk,
            Remark: rmrk
        });
        return this.http.post( host +'SatinRejectionReview/InsertData',body,{headers:headers})
            .map(res => res.json());
    }

    updateData(formatdate: string, itemcode: string, holdqty:string, bufferqty:string, rejqty: string, 
    okqty:string, pinhole:string, skpltng:string, handmourej:string, prcssmourej: string,  
    whtmrk:string, pinmrk:string, warpg:string,  slvrmrk:string,   dotplstc:string,  chormbrng:string, 
    dentmrks: string, scrtchs:string, coprbrng:string,  jigdmg:string, hghgloss:string, lowgloss:string, 
    shdvrtn:string, ptchmrks:string, nckl:string, rghnss:string, blstr:string, blckspt:string, satinmrk:string, 
    chmclmrk:string, tchbrng:string, othr: string, wtrmrk: string, rmrk: string)
    {
        var headers = new Headers();
        headers.append('Content-Type','Application/Json');

        var body = JSON.stringify({
            Loading_Date: formatdate,
            Item_Code: itemcode,
            Hold_Qty: holdqty,
            Buffering_Qty: bufferqty,
            Rejected_Qty: rejqty,
            OK_Qty: okqty,
            Pin_Hole: pinhole,            
            Skip_Plating: skpltng,
            Hand_Mou_Rej: handmourej,
            Pro_Mou_Rej: prcssmourej,
            White_Mark: whtmrk,
            Pitmarks: pinmrk,
            War_Page: warpg,
            Silver_Mark: slvrmrk,
            Dot_Plastic: dotplstc,
            Chorm_Burning: chormbrng,
            Dent_Marks: dentmrks,
            Scratches: scrtchs,
            Copper_Burning: coprbrng,
            Jig_Damage: jigdmg,
            High_Gloss: hghgloss,
            Low_Gloss: lowgloss,
            Shade_Variation: shdvrtn,
            Patch_Mark: ptchmrks,
            Nickel: nckl,
            Roughness: rghnss,
            Blister: blstr,
            Black_Spot: blckspt,
            Satin_Mark: satinmrk,
            Chemical_Mark: chmclmrk,
            Touch_Burning: tchbrng,
            Other: othr,
            Water_Mark: wtrmrk,
            Remark: rmrk
        });
        return this.http.post( host +'SatinRejectionReview/UpdateData',body,{headers:headers})
            .map(res => res.json());
    }
}