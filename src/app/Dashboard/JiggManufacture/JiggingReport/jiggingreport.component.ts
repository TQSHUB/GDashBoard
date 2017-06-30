import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { JiggingReportService } from '../../../Services/JiggManufacture/jiggingreport.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var ETE: any;
declare var ETEJson: any;

@Component({
    selector: 'jiggingreport',
    templateUrl: './jiggingreport.component.html',
    providers: [JiggingReportService, DatePipe]
})

export class JiggingReportComponent{
    p;
    busy: Subscription;
    ResponseData;

    Alias_Names;
    Customer_Names;
    Selected_Alias_Names; 
    Selected_Customer_Names;
    FromDate;
    ToDate;

    //total
    actualrndjigshift_A = 0;
    actualrndjigshift_B = 0;
    actualrndjigshift_C = 0;
    actualrndjigtotal = 0;
    totrndagnstprdn = 0;
    totrndagnstprdn_wthjig = 0;
    totrndagnstprdn_wthoutjig = 0;

    constructor(private router: Router, private http: Http, private jiggingreportservice: JiggingReportService, private datepipe: DatePipe){}

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/JiggManufacture/jiggingreport.component.js';

        var fromdate = Date.now();
        var date = this.datepipe.transform(fromdate, 'dd/MM/yyyy');

        this.FromDate = date;
        this.ToDate = date;

        //console.log(this.FromDate);

        this.getBindItems_ByAliasName();
        this.getBindCustomer_ByName();
        this.Search();
    }

    getBindItems_ByAliasName()
    {
        this.jiggingreportservice.getBindItems_ByAliasName().subscribe(res => {
            this.Alias_Names = res.Data;
        });
    }
  
    getBindCustomer_ByName()
    {
        this.jiggingreportservice.getBindCustomer_ByName().subscribe(res => {
            this.Customer_Names = res.Data;
        });
    }

    Search()
    {
        //Get For Values
        this.Selected_Alias_Names = $("#Alias_Names").val();
        this.Selected_Customer_Names = $("#Customer_Names").val();

        //string builder for multiple Alias_Name and Customer_Name
        var alias_string = this.inStringBuilder(this.Selected_Alias_Names);
        var customer_string = this.inStringBuilder(this.Selected_Customer_Names);
        var itemtype_string = $("#ItemType").val();
        var natureofcomp_string = $("#natureofcomp").val();
        var loadingshift_string = $("#ldngshift").val();

        var FromDate = $("input[name=FromDate]").val();
        var ToDate = $("input[name=ToDate]").val();

        /*if(FromDate == '' && ToDate == '')
        {
            this.FromDate = '';
            this.ToDate = '';
        }
        else
        {
            this.FromDate = this.datepipe.transform(FromDate,"MM/dd/yyyy");
            this.ToDate = this.datepipe.transform(ToDate,"MM/dd/yyyy");
        }*/

        if(itemtype_string == 'NULL')
            itemtype_string = '';
        if(natureofcomp_string == 'NULL')
            natureofcomp_string = '';
        if(loadingshift_string == 'NULL')
            loadingshift_string = '';

        this.busy = this.jiggingreportservice.getJiggingDetailData(FromDate, ToDate, alias_string, customer_string, natureofcomp_string, itemtype_string, loadingshift_string)
            .subscribe(res => {
                this.ResponseData = JSON.parse(res.Data);
                //console.log(this.ResponseData);
                this.TotalData(this.ResponseData);
            });
    }

    inStringBuilder(a: any)
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
    }

    TotalData(res)
    {
        var i;
        this.actualrndjigshift_A = 0;
        this.actualrndjigshift_B = 0;
        this.actualrndjigshift_C = 0;
        this.actualrndjigtotal = 0;
        this.totrndagnstprdn = 0;
        this.totrndagnstprdn_wthjig = 0;
        this.totrndagnstprdn_wthoutjig = 0;
        for(i = 0; i < res.length; i++)
        {
            this.actualrndjigshift_A += parseInt(res[i]['Actual jigged Shift A']);
            this.actualrndjigshift_B += parseInt(res[i]['Actual jigged Shift B']);
            this.actualrndjigshift_C += parseInt(res[i]['Actual jigged Shift C']);
            this.actualrndjigtotal += parseInt(res[i]['Actual Round Jigged']);
            this.totrndagnstprdn += parseInt(res[i]['Total Rounds agnst Prdn']);
            this.totrndagnstprdn_wthjig += parseInt(res[i]['Total Rounds agnst Prdn with jigg']);
            this.totrndagnstprdn_wthoutjig += parseInt(res[i]['Total Rounds agnst Prdn without jigg']);
        }
    }

    ExportToExcel()
    {
        var alias_string, customer_string, natureofcomp_string, itemtype_string, loadingshift_string;
        
        if(this.ResponseData.length > 0)
            ETE();
        else
        {
            var response;
            this.busy = this.jiggingreportservice.getJiggingDetailData(this.FromDate, this.ToDate, alias_string, customer_string, natureofcomp_string, itemtype_string, loadingshift_string).subscribe(res => {
                response = JSON.parse(res);
             ETEJson(response);
            });
        }
    }
}