import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JiggMfgReportService } from '../../../Services/JiggManufacture/jiggmfgreport.service';
import { DatePipe } from '@angular/common';
import { JsonDate } from '../../../Pipes/jsondate.pipe';
import { SearchPipe } from './searchtable.pipe';
import * as $ from 'jquery';

declare var ETE: any;


@Component({
  selector: 'jiggreportcomponent',
  templateUrl: './jiggreport.component.html',
  providers: [JiggMfgReportService, DatePipe, JsonDate, SearchPipe]
})

export class JiggReportComponent{

    Alias_Names;
    JiggMfgReportRes;
    Headers;
    ResponseDataCopy;
    searchText;

    FromDate;
    ToDate;
    Purpose;

    constructor(private router:Router, private jiggMfgReportService: JiggMfgReportService, private datepipe: DatePipe, private jsondate: JsonDate, private searchPipe: SearchPipe){}

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/JiggManufacture/jiggmfgreport.component.js';

        var fromdate = Date.now();
        var date = this.datepipe.transform(fromdate, 'dd/MM/yyyy');

        this.FromDate = date;
        this.ToDate = date;
        
        this.jiggMfgReportService.getJiggMfgReport(date, date, '','').subscribe(res => {
            this.JiggMfgReportRes = JSON.parse(res.JsonData);
            this.Headers = res.Headers;

            var i = 0;
            for(i = 0; i< this.JiggMfgReportRes.length; i++)
            {   
                var receiveddate = this.JiggMfgReportRes[i]['Received Date'];
                this.JiggMfgReportRes[i]['Received Date'] = this.datepipe.transform(this.jsondate.transform(receiveddate),'dd/MM/yyyy');

                var rectifieddate = this.JiggMfgReportRes[i]['Rectified Date'];
                this.JiggMfgReportRes[i]['Rectified Date'] = this.datepipe.transform(this.jsondate.transform(rectifieddate),'dd/MM/yyyy'); 
            }

            this.ResponseDataCopy = this.JiggMfgReportRes;
        })

        this.getBindItems_ByAliasName();
    }

    getBindItems_ByAliasName(){
        this.jiggMfgReportService.getBindItems_ByAliasName().subscribe(res => {
        this.Alias_Names = res.Data;
        });
    }

    getJiggMfgReport(){

        //Get For Values
      var alias_names = $("#Alias_Names").val();
      
      //string builder for multiple Alias_Name and Customer_Name
      var alias_string = this.inStringBuilder(alias_names);

      this.Purpose = $("#Purpose").val();
      if(this.Purpose == 'NULL')
        this.Purpose = '';

      this.FromDate = $("input[name=FromDate]").val();
      this.ToDate = $("input[name=ToDate]").val();

        this.jiggMfgReportService.getJiggMfgReport(this.FromDate, this.ToDate, alias_string,this.Purpose ).subscribe(res => {
            this.JiggMfgReportRes = JSON.parse(res.JsonData);
            this.Headers = res.Headers;

            var i = 0;
            for(i = 0; i< this.JiggMfgReportRes.length; i++)
            {   
                var receiveddate = this.JiggMfgReportRes[i]['Received Date'];
                this.JiggMfgReportRes[i]['Received Date'] = this.datepipe.transform(this.jsondate.transform(receiveddate),'dd/MM/yyyy');

                var rectifieddate = this.JiggMfgReportRes[i]['Rectified Date'];
                this.JiggMfgReportRes[i]['Rectified Date'] = this.datepipe.transform(this.jsondate.transform(rectifieddate),'dd/MM/yyyy'); 
            }

            this.ResponseDataCopy = this.JiggMfgReportRes;

        });
    }

    SearchTextBox(){
        var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
        if(filterData == 'Empty')
        {
        this.JiggMfgReportRes = this.ResponseDataCopy;
        }
        else
        {
        this.JiggMfgReportRes = filterData;
        }
    }

    ExportToExcel(){
      ETE(this.JiggMfgReportRes);
    }

    inStringBuilder(a: any){
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

}