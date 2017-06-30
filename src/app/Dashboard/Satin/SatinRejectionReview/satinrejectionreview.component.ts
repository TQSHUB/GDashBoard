import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { SatinRejectionReviewService } from '../../../Services/Satin/satinrejectionreview.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var sum: any;

@Component({
    selector: 'satinrejectionreview',
    templateUrl: './satinrejectionreview.component.html',
    providers: [SatinRejectionReviewService, DatePipe]
})

export class SatinRejectionReviewComponent{
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

    flag = '';
    ddRejType;

    //bindrejectiondata
    Rejectiondata;
    Hldqty = '0';
    Bfrqty = '0';
    Rejectedqty = '0';
    Okqty = '0';
    PinHole = '0';
    SkipPlating = '0';
    ProMouRej = '0';    
    HandMouRej = '0';
    WhtMark = '0';
    PinMark = '0';
    WarPage = '0';
    SilverMarks = '0';
    DotPlastc = '0';
    ChormBrng = '0';
    DentMarks = '0';
    Scratches = '0';
    CoprBrng = '0';
    JigDmg = '0';
    HighGloss = '0';
    LowGloss = '0';    
    ShadVarton = '0';
    PatchMarks = '0';
    Nickel = '0';
    Roughness = '0';
    Blister = '0';
    BlackSpot = '0';
    SatinMark = '0';
    ChemclMark = '0';
    TouchBrng = '0';
    Other = '0';
    WaterMark = '0';
    Remark = '0';

    insertdata;
    updatedata;
    display_message;
    display_message_class;

    date;
    LowGlass;

    constructor(private router: Router, private http: Http, private satinrejectionreviewservice: SatinRejectionReviewService, private datepipe: DatePipe){}

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/Satin/satinrejectionreview.component.js';

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

        this.satinrejectionreviewservice.getBindItems_ByAliasName(DisplayDate, linetype, alias_string)
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

        this.satinrejectionreviewservice.bindalldata(DisplayDate, alias_string)
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

        this.satinrejectionreviewservice.bindrejectionData(DisplayDate, alias_string, this.ddRejType)
            .subscribe(res => {
                if(res.Data == '0')
                {
                    this.flag = 'INSERT';
                    this.Hldqty = '0';
                    this.Bfrqty = '0';
                    this.Rejectedqty = '0';
                    this.Okqty = '0';
                    this.PinHole = '0';
                    this.SkipPlating = '0';
                    this.ProMouRej = '0';    
                    this.HandMouRej = '0';
                    this.WhtMark = '0';
                    this.PinMark = '0';
                    this.WarPage = '0';
                    this.SilverMarks = '0';
                    this.DotPlastc = '0';
                    this.ChormBrng = '0';
                    this.DentMarks = '0';
                    this.Scratches = '0';
                    this.CoprBrng = '0';
                    this.JigDmg = '0';
                    this.HighGloss = '0';
                    this.LowGloss = '0';    
                    this.ShadVarton = '0';
                    this.PatchMarks = '0';
                    this.Nickel = '0';
                    this.Roughness = '0';
                    this.Blister = '0';
                    this.BlackSpot = '0';
                    this.SatinMark = '0';
                    this.ChemclMark = '0';
                    this.TouchBrng = '0';
                    this.Other = '0';
                    this.WaterMark = '0';
                    this.Remark = '0';
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
                    this.PinHole = this.Rejectiondata[0]['Pin Hole'];
                    this.SkipPlating = this.Rejectiondata[0]['Skip Plating'];
                    this.ProMouRej = this.Rejectiondata[0]['Pro Mou Rej'];
                    this.HandMouRej = this.Rejectiondata[0]['Hand Mou Rej'];
                    this.WhtMark = this.Rejectiondata[0]['White Mark'];
                    this.PinMark = this.Rejectiondata[0]['Pitmarks'];
                    this.WarPage = this.Rejectiondata[0]['War Page'];
                    this.SilverMarks = this.Rejectiondata[0]['Silver Mark'];
                    this.DotPlastc = this.Rejectiondata[0]['Dot Plastic'];
                    this.ChormBrng = this.Rejectiondata[0]['Chorm Burning'];
                    this.DentMarks = this.Rejectiondata[0]['Dent Marks'];
                    this.Scratches = this.Rejectiondata[0]['Scratches'];
                    this.CoprBrng = this.Rejectiondata[0]['Copper Burning'];
                    this.JigDmg = this.Rejectiondata[0]['Jig Damage'];
                    this.HighGloss = this.Rejectiondata[0]['High Gloss'];
                    this.LowGloss = this.Rejectiondata[0]['Low Gloss'];
                    this.ShadVarton = this.Rejectiondata[0]['Shade Variation'];
                    this.PatchMarks = this.Rejectiondata[0]['Patch Marks'];
                    this.Nickel = this.Rejectiondata[0]['Nickel'];
                    this.Roughness = this.Rejectiondata[0]['Roughness'];
                    this.Blister = this.Rejectiondata[0]['Blister'];
                    this.BlackSpot = this.Rejectiondata[0]['Black Spot'];
                    this.SatinMark = this.Rejectiondata[0]['Satin Mark'];
                    this.ChemclMark = this.Rejectiondata[0]['Chemical Mark'];
                    this.TouchBrng = this.Rejectiondata[0]['Touch Burning'];
                    this.Other = this.Rejectiondata[0]['Other'];
                    this.WaterMark = this.Rejectiondata[0]['Water Mark'];
                    this.Remark = this.Rejectiondata[0]['remark'];

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

        this.busy = this.satinrejectionreviewservice.search(this.DisplayDate, this.linetype, alias_string)
            .subscribe(res => {
                this.ResponseData = JSON.parse(res.Data);
                //console.log(this.ResponseData);
            });

        this.clearValues();
    }

    insertData()
    {
        this.ddRejType = $("#RejType").val();
        
        this.satinrejectionreviewservice.insertData(this.datepipe.transform(Date.now(),'dd/MM/yyyy'),
        this.Selected_Alias_Names,this.DisplayDate,this.ddRejType, this.HoldQty, this.Bfrqty, 
        this.Rejectedqty, this.Okqty, this.PinHole, this.SkipPlating, this.HandMouRej, this.ProMouRej,
        this.WhtMark, this.PinMark, this.WarPage, this.SilverMarks, this.DotPlastc, this.ChormBrng, 
        this.DentMarks, this.Scratches, this.CoprBrng, this.JigDmg, this.HighGloss, this.LowGloss, 
        this.ShadVarton, this.PatchMarks, this.Nickel, this.Roughness, this.Blister, this.BlackSpot, this.SatinMark, 
        this.ChemclMark, this.TouchBrng, this.Other, this.WaterMark, this.Remark)
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
        console.log(this.Okqty, this.HoldQty, this.Bfrqty, this.Rejectedqty);
        
        this.satinrejectionreviewservice.updateData(DisplayDate, alias_string, this.HoldQty, this.Bfrqty, 
        this.Rejectedqty, this.Okqty, this.PinHole, this.SkipPlating, this.HandMouRej, this.ProMouRej,
        this.WhtMark, this.PinMark, this.WarPage, this.SilverMarks, this.DotPlastc, this.ChormBrng, 
        this.DentMarks, this.Scratches, this.CoprBrng, this.JigDmg, this.HighGloss, this.LowGloss, 
        this.ShadVarton, this.PatchMarks, this.Nickel, this.Roughness, this.Blister, this.BlackSpot, this.SatinMark, 
        this.ChemclMark, this.TouchBrng, this.Other, this.WaterMark, this.Remark)
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
        this.PinHole = '0';
        this.SkipPlating = '0';
        this.ProMouRej = '0';    
        this.HandMouRej = '0';
        this.WhtMark = '0';
        this.PinMark = '0';
        this.WarPage = '0';
        this.SilverMarks = '0';
        this.DotPlastc = '0';
        this.ChormBrng = '0';
        this.DentMarks = '0';
        this.Scratches = '0';
        this.CoprBrng = '0';
        this.JigDmg = '0';
        this.HighGloss = '0';
        this.LowGloss = '0';    
        this.ShadVarton = '0';
        this.PatchMarks = '0';
        this.Nickel = '0';
        this.Roughness = '0';
        this.Blister = '0';
        this.BlackSpot = '0';
        this.SatinMark = '0';
        this.ChemclMark = '0';
        this.TouchBrng = '0';
        this.Other = '0';
        this.WaterMark = '0';
        this.Remark = '0';

        setTimeout(()=> {
        this.display_message_class = '';
        this.display_message = '';
        }, 2000);
    }

    Total(){
        sum();
    }
}