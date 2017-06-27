import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { ChromeRejectionReviewService } from '../../../Services/Chrome/chromerejectionreview.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var sum: any;

@Component({
    selector: 'chromerejectionreview',
    templateUrl: './chromerejectionreview.component.html',
    providers: [ChromeRejectionReviewService, DatePipe]
})

export class ChromeRejectionReviewComponent{
    busy: Subscription;
    ResponseData;

    DisplayDate;
    Alias_Names;
    Selected_Alias_Names;

    //bindalldata
    Alldata;
    HoldQty = 'None';
    BufferQty = 'None';
    RejQty = 'None';
    linetype;

    //bindrejectiondata
    Rejectiondata;
    Hldqty = '0';
    Bfrqty = '0';
    Rejectedqty = '0';
    Okqty = '0';
    Pitting = '0';
    PinHole = '0';
    Dent = '0';
    HandMouRej = '0';
    NicklShow = '0';
    PatchMarks = '0';
    ScratchMarks = '0';
    Roughness = '0';
    CrBurn = '0';
    Other = '0';
    SilverMarks = '0';
    MouldngRej = '0';
    SkipPlating = '0';
    CoprBrng = '0';
    WarPage = '0';
    WhtMark = '0';
    DotPlastc = '0';
    WaterMark = '0';
    Blister = '0';
    JigDmg = '0';
    Remark = '0';

    insertdata;
    updatedata;
    display_message;
    display_message_class;
    date;
    //todaydate; itemcode; loadingqty; okqty; holdqty; bufferqty; rejqty; piting; pinhole;
    //dent; handmourej; nklshow; patchmarks; scratchmarks; rghness; crbrn; othr; slvrmrk;
    //mldrej; skpltng; coprbrng; warpg; whtmrk; dotplstc; wtrmrk; blstr; jigdmg; rmrk;
    //formtdt; rejtype;

    flag = '';
    ddRejType;

    txtValues;
    total = '0';

    constructor(private router: Router, private http: Http, private chromerejectionreviewservice: ChromeRejectionReviewService, private datepipe: DatePipe){}

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/Chrome/chromerejectionreview.component.js';

        this.getBindItems_ByAliasName();
        this.Search();
        this.bindalldata();
        this.bindrejectionData();
    }

    getBindItems_ByAliasName()
    {
        this.Selected_Alias_Names = $("#Alias_Names").val();

        var alias_string = this.Selected_Alias_Names;
        var DisplayDate = $("input[name=Date]").val();
        var linetype = $("#LineType").val();

        this.chromerejectionreviewservice.getBindItems_ByAliasName(DisplayDate, linetype, alias_string)
        .subscribe(res => {
            this.Alias_Names = JSON.parse(res.Data);
            //console.log(this.Alias_Names);
        });
    }

    bindalldata()
    {
        this.Selected_Alias_Names = $("#Alias_Names").val();

        var alias_string = this.Selected_Alias_Names;
        var DisplayDate = $("input[name=Date]").val();

        this.chromerejectionreviewservice.bindalldata(DisplayDate, alias_string)
            .subscribe(res => {
                this.Alldata = JSON.parse(res.Data);
                console.log(this.Alldata);
                this.HoldQty = this.Alldata[0]['Hold Qty'];
                this.BufferQty = this.Alldata[0]['Buffering Qty'];
                this.RejQty = this.Alldata[0]['Rejected Qty'];                //console.log(this.Alldata[0]['Buffering Qty']);
            });
    }

    bindrejectionData()
    {
        this.Selected_Alias_Names = $("#Alias_Names").val();

        var alias_string = this.Selected_Alias_Names;
        var DisplayDate = $("input[name=Date]").val();
        this.ddRejType = $("#RejType").val();

        this.chromerejectionreviewservice.bindrejectionData(DisplayDate, alias_string, this.ddRejType)
            .subscribe(res => {
                if(res.Data == '0')
                {
                    this.flag = 'INSERT';
                    this.Hldqty = '0';
                    this.Bfrqty = '0';
                    this.Rejectedqty = '0';
                    this.Okqty = '0';
                    this.Pitting = '0';
                    this.PinHole = '0';
                    this.Dent = '0';
                    this.HandMouRej = '0';
                    this.NicklShow = '0';
                    this.PatchMarks = '0';
                    this.ScratchMarks = '0';
                    this.Roughness = '0';
                    this.CrBurn = '0';
                    this.Other = '0';
                    this.SilverMarks = '0';
                    this.MouldngRej = '0';
                    this.SkipPlating = '0';
                    this.CoprBrng = '0';
                    this.WarPage = '0';
                    this.WhtMark = '0';
                    this.DotPlastc = '0';
                    this.WaterMark = '0';
                    this.Blister = '0';
                    this.JigDmg = '0';
                }
                else
                {
                    this.flag = 'UPDATE';
                    this.Rejectiondata = JSON.parse(res.Data);
                    console.log(this.Rejectiondata);
                    this.Hldqty = this.Rejectiondata[0]['Hold Qty'];
                    this.Bfrqty = this.Rejectiondata[0]['Buffering Qty'];
                    this.Rejectedqty = this.Rejectiondata[0]['Rejected Qty'];
                    this.Okqty = this.Rejectiondata[0]['OK Qty'];
                    this.Pitting = this.Rejectiondata[0]['Pitting'];
                    this.PinHole = this.Rejectiondata[0]['Pin Hole'];
                    this.Dent = this.Rejectiondata[0]['Dent'];
                    this.HandMouRej = this.Rejectiondata[0]['Hand Mou Rej'];
                    this.NicklShow = this.Rejectiondata[0]['Nickle Showg'];
                    this.PatchMarks = this.Rejectiondata[0]['Patch Marks'];
                    this.ScratchMarks = this.Rejectiondata[0]['Scratch Marks'];
                    this.Roughness = this.Rejectiondata[0]['Roughness'];
                    this.CrBurn = this.Rejectiondata[0]['Cr Burn'];
                    this.Other = this.Rejectiondata[0]['Other'];
                    this.SilverMarks = this.Rejectiondata[0]['Silver Mark'];
                    this.MouldngRej = this.Rejectiondata[0]['Moulding Rej'];
                    this.SkipPlating = this.Rejectiondata[0]['Skip Plating'];
                    this.CoprBrng = this.Rejectiondata[0]['Copper Burning'];
                    this.WarPage = this.Rejectiondata[0]['War Page'];
                    this.WhtMark = this.Rejectiondata[0]['White Mark'];
                    this.DotPlastc = this.Rejectiondata[0]['Dot Plastic'];
                    this.WaterMark = this.Rejectiondata[0]['Water Mark'];
                    this.Blister = this.Rejectiondata[0]['Blister'];
                    this.JigDmg = this.Rejectiondata[0]['Jig Damage'];
                    //this.Remark = this.Rejectiondata[0]['remark'];

                    //this.display_message = 'Entry already exist';
                }                
            });
    }

    Search()
    {
        //Get For Values
        this.Selected_Alias_Names = $("#Alias_Names").val();
        var alias_string = this.Selected_Alias_Names;
        
        this.linetype = $("#LineType").val();

        this.DisplayDate = $("input[name=Date]").val();

        this.busy = this.chromerejectionreviewservice.search(this.DisplayDate, this.linetype, alias_string)
            .subscribe(res => {
                this.ResponseData = JSON.parse(res.Data);
                //console.log(this.ResponseData);
            });

        this.clearValues();
    }

    insertData()
    {
        this.ddRejType = $("#RejType").val();
        
        this.chromerejectionreviewservice.insertData(this.datepipe.transform(Date.now(),'dd/MM/yyyy'),this.Selected_Alias_Names,this.DisplayDate,this.ddRejType,this.Okqty, this.HoldQty, this.Bfrqty, this.Rejectedqty, 
        this.Pitting, this.PinHole, this.Dent, this.HandMouRej, this.NicklShow, this.PatchMarks, this.ScratchMarks, 
        this.Roughness, this.CrBurn, this.Other, this.SilverMarks, this.MouldngRej, this.SkipPlating, this.CoprBrng, 
        this.WarPage, this.WhtMark, this.DotPlastc, this.WaterMark, this.Blister, this.JigDmg, this.Remark)
            .subscribe(res => {
                this.insertdata = JSON.parse(res.Data);
                console.log(this.insertdata);

                if(this.insertdata)
                {
                    this.display_message = 'Data Saved successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';
                    this.bindrejectionData();
                    this.clearValues();
                    this.flag = 'INSERT';
                }
                else
                {
                    this.display_message = 'Data not Saved successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                    this.clearValues();
                    this.flag = 'INSERT';
                }
            });
    }

    FunctionOnCaption()
    {
        if(this.flag == 'INSERT')
            this.insertData();
        if(this.flag == 'UPDATE')
            //console.log(this.caption);
            this.updateData();
    }

    updateData()
    {
        var DisplayDate = $("input[name=Date]").val();
        this.Selected_Alias_Names = $("#Alias_Names").val();
        var alias_string = this.Selected_Alias_Names;
        //this.ddRejType = $("#RejType").val();
        //console.log(this.Okqty, this.HoldQty, this.Bfrqty, this.Rejectedqty);
        
        this.chromerejectionreviewservice.updateData(DisplayDate, alias_string, this.Okqty, this.HoldQty, this.Bfrqty, this.Rejectedqty, 
        this.Pitting, this.PinHole, this.Dent, this.HandMouRej, this.NicklShow, this.PatchMarks, this.ScratchMarks, 
        this.Roughness, this.CrBurn, this.Other, this.SilverMarks, this.MouldngRej, this.SkipPlating, this.CoprBrng, 
        this.WarPage, this.WhtMark, this.DotPlastc, this.WaterMark, this.Blister, this.JigDmg, this.Remark)
            .subscribe(res => {
                this.updatedata = JSON.parse(res.Data);
                console.log(this.updatedata);

                if(this.updatedata)
                {
                    this.display_message = 'Data Updated successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';
                    this.bindrejectionData();
                    this.clearValues();
                    this.flag = 'UPDATE';
                }
                else
                {
                    this.display_message = 'Data not Updated successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                    this.clearValues();
                    this.flag = 'UPDATE';
                }
            });
    }

    clearValues()
    {
        //this.caption = 'ADD';        
        this.Selected_Alias_Names = '';
        this.ddRejType = '';

        this.HoldQty = 'None';
        this.BufferQty = 'None';
        this.RejQty = 'None';

        this.Hldqty = '0';
        this.Bfrqty = '0';
        this.Rejectedqty = '0';
        this.Okqty = '0';
        this.Pitting = '0';
        this.PinHole = '0';
        this.Dent = '0';
        this.HandMouRej = '0';
        this.NicklShow = '0';
        this.PatchMarks = '0';
        this.ScratchMarks = '0';
        this.Roughness = '0';
        this.CrBurn = '0';
        this.Other = '0';
        this.SilverMarks = '0';
        this.MouldngRej = '0';
        this.SkipPlating = '0';
        this.CoprBrng = '0';
        this.WarPage = '0';
        this.WhtMark = '0';
        this.DotPlastc = '0';
        this.WaterMark = '0';
        this.Blister = '0';
        this.JigDmg = '0';

        setTimeout(()=> {
        this.display_message_class = '';
        this.display_message = '';
        }, 2000);
    }

    addition()
    {
        this.total = '0';

        for(var i=0; i<20; i++)
            this.total += this.txtValues[i];
        this.Rejectedqty = this.total.toString();
    }

    Total(){
        sum();
    }

    /*inStringBuilder(a: any)
    {
        var i;
        var stringBuilder = '';
        for(i=0; i < a.length; i++)
        {
        if(i == a.length -1)
            stringBuilder = stringBuilder + '\'' + a[i] + '\'';
        else
            stringBuilder = stringBuilder + '\'' + a[i] + '\',';
        }
        return stringBuilder;
    }*/
}