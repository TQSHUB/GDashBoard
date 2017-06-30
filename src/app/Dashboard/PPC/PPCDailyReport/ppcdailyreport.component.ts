import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import {GenericTableComponent, GtConfig} from '@angular-generic-table/core';
import { PPCDailyReportService } from '../../../Services/PPC/ppcdailyreport.service'
import { SearchPipePPCDailyReport } from './searchtable.pipe';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var ETE: any;

@Component({
  selector: 'ppc-daily-report',
  templateUrl: './ppcdailyreport.component.html',
  providers: [PPCDailyReportService, DatePipe, SearchPipePPCDailyReport],
  styleUrls: ['./ppcdailyreport.component.css']
})
export class PPCDailyReportComponent {
  p;
  busy: Subscription;
  ResponseData;
  ResponseDataCopy;
  TopHeader = [];
  ModifiedHeaders;
  display_message;
  display_message_class;
  display_message_1;
  display_message_class_1;

  //local variables
  Alias_Names;
  Customer_Names;
  Selected_Alias_Names; 
  Selected_Customer_Names;
  FromDate;
  ToDate;
  whichfunctioncalled;

  //update fileds
  CustomerID;
  ItemID;
  MQty;
  PlanA;
  PlanB;
  PlanC;
  PlanedRound;

  //Totals
  TotalPA = 0;
  TotalPB = 0;
  TotalPC = 0;
  TotalTP = 0;
  TotalARJA = 0;
  TotalARJB = 0;
  TotalARJC = 0;
  TotalARJ = 0;
  TotalTRAP = 0;
  TotalTRWJ = 0;
  TotalTRWhJ = 0;

  //search
  searchText
  //file upload
  files;

  pageload = 'first';

  

    
  constructor(private http: Http, private ppcDailyReportService: PPCDailyReportService, private datepipe: DatePipe, private searchPipe: SearchPipePPCDailyReport){}

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/PPC/scheduleedit.component.js';

    this.getBindCustomer_ByName();
    this.getBindItems_ByAliasName();
  }

  ngAfterViewInit(){
    var monthenddate = new Date();
    this.FromDate = this.datepipe.transform(monthenddate,'dd/MM/yyyy');
    this.ToDate = this.datepipe.transform(monthenddate,'dd/MM/yyyy');

    $("#selectedMonth").val(monthenddate.getMonth() + 1);
    this.Search();
  }

  getBindItems_ByAliasName(){
    this.ppcDailyReportService.getBindItems_ByAliasName().subscribe(res => {
      this.Alias_Names = res.Data;
    });
  }
  getBindCustomer_ByName(){
    this.ppcDailyReportService.getBindCustomer_ByName().subscribe(res => {
      this.Customer_Names = res.Data;
    });
  }

  Search()
  {
    var Month = $("#selectedMonth").val();
    if(Month == 'NULL')
    {
      Month = '';
    }

      if($("#PlanedRound").is(':checked'))
            this.PlanedRound = 1;
      else
            this.PlanedRound = 0;
      
      //Get For Values
      this.Selected_Alias_Names = $("#Alias_Names").val();
      this.Selected_Customer_Names = $("#Customer_Names").val();
      //string builder for multiple Alias_Name and Customer_Name
      var alias_string = this.inStringBuilder(this.Selected_Alias_Names);
      var customer_string = this.inStringBuilder(this.Selected_Customer_Names);
      var itemtype_string = $("#ItemType").val();
      var natureofcomp_string = $("#NatureOfComp").val();

      if(this.pageload != 'first')
      {
        this.FromDate = $("input[name=FromDate]").val();
        this.ToDate = $("input[name=ToDate]").val();
      }
      this.pageload = '';
      //console.log(fromdate);  

      if(itemtype_string == 'NULL')
        itemtype_string = '';
      if(natureofcomp_string == 'NULL')
        natureofcomp_string = '';

      this.busy = this.ppcDailyReportService.getPPCDailyReport(Month,this.FromDate, this.ToDate, itemtype_string, natureofcomp_string, alias_string,customer_string,this.PlanedRound).subscribe(res => {
        this.ResponseData = JSON.parse(res.JsonData);
        var headers = res.Headers;
        
        var i;
        for(i =0; i< 23; i++)
        {
          this.TopHeader.push(headers[i]);
        }  

        this.ResponseDataCopy = this.ResponseData;
        this.whichfunctioncalled = 'Search';
        this.TotalData(this.ResponseData);
      });
  }

  selectedItem(item){
    this.MQty = item.MQty;
    this.CustomerID = item.CustomerID;
    this.ItemID = item.Itemid;
    var status = $("#MStatus").val(item.Mstatus);
    //console.log(status);
    this.PlanA = item['Plan A'];
    this.PlanB = item['Plan B'];
    this.PlanC = item['Plan C'];
    //console.log(item);
  }

updatePPCReport(){
  this.busy = this.ppcDailyReportService.updatePPCReport(this.CustomerID,this.ItemID, $("#MStatus").val(), this.MQty,this.PlanA,this.PlanB, this.PlanC).subscribe(res => {
    if(res == true)
    {
      this.Search();
    }
    else
    {
        this.display_message_1 = 'Error';
        this.display_message_class_1 = 'alert alert-danger alert-dismissible';
        this.clearValues();
    }
  })
}

clearValues(){
    this.MQty = '';
    this.PlanA = '';
    this.CustomerID = '';
    this.ItemID = '';
    this.PlanB = '';
    this.PlanC = '';

    setTimeout(() => {
      this.display_message_1 = '';
      this.display_message_class_1 = '';
      this.display_message = '';
      this.display_message_class = '';
    }, 4000);
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

uploadFile(){
    var files = $("#exampleInputFile");
    var file = files[0].files;

    let formData: FormData = new FormData();  
    formData.append('uploadFile', file[0], file.name); 

    let headers = new Headers()  
    headers.append('enctype', 'multipart/form-data');  
    headers.append('Accept', 'application/json');  
    let options = new RequestOptions({ headers: headers });  
    let apiUrl = host + 'PPCController/FileUploadScheduleEdit';  

    this.http.post(apiUrl, formData, options)  
        .map(res => res.json())  
        .catch(error => Observable.throw(error))  
        .subscribe(  
          res => {
            if(res.Data.flag)
            {
              this.display_message = res.Data.message;
              this.display_message_class = 'alert alert-success alert-dismissible';
              this.clearValues();
            }
            else
            {
              this.display_message = res.Data.message;
              this.display_message_class = 'alert alert-danger alert-dismissible';
              this.clearValues();
            }
          });  
  }

  ExportToExcel(){
      ETE();
  }

  TotalData(res){
    var i;
    this.TotalPA = 0;
    this.TotalPB = 0;
    this.TotalPC = 0;
    this.TotalTP = 0;
    this.TotalARJA = 0;
    this.TotalARJB = 0;
    this.TotalARJC = 0;
    this.TotalARJ = 0;
    this.TotalTRAP = 0;
    this.TotalTRWJ = 0;
    this.TotalTRWhJ = 0;
    for(i = 0; i < res.length; i++)
    {
      this.TotalPA += parseInt(res[i]['Plan A']);
      this.TotalPB += parseInt(res[i]['Plan B']);
      this.TotalPC += parseInt(res[i]['Plan C']);
      this.TotalTP += parseInt(res[i]['Total Plan']);
      this.TotalARJA += parseInt(res[i]['Actual jigged Shift A']);
      this.TotalARJB += parseInt(res[i]['Actual jigged Shift B']);
      this.TotalARJC += parseInt(res[i]['Actual jigged Shift C']);
      this.TotalARJ += parseInt(res[i]['Actual Round Jigged']);
      this.TotalTRAP += parseInt(res[i]['Total Rounds agnst Prdn']);
      this.TotalTRWJ += parseInt(res[i]['Total Rounds agnst Prdn with jigg']);
      this.TotalTRWhJ += parseInt(res[i]['Total Rounds agnst Prdn without jigg']);
    }
  }

  SearchTextBox(){
    var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
    if(filterData == 'Empty')
    {
      this.ResponseData = this.ResponseDataCopy;
      this.TotalData(this.ResponseData);
    }
    else
    {
      this.ResponseData = filterData;
      this.TotalData(this.ResponseData);
    }
  }
}