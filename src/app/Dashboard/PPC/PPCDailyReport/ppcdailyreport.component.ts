import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import {GenericTableComponent, GtConfig} from '@angular-generic-table/core';
import { PPCDailyReportService } from '../../../Services/PPC/ppcdailyreport.service'
import { SearchPipe } from './searchtable.pipe';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var ETE: any;

@Component({
  selector: 'ppc-daily-report',
  templateUrl: './ppcdailyreport.component.html',
  providers: [PPCDailyReportService, DatePipe, SearchPipe],
  styleUrls: ['./ppcdailyreport.component.css']
})
export class PPCDailyReportComponent {
  busy: Subscription;
  ResponseData;
  ResponseDataCopy;
  TopHeader;
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

  //search
  searchText
  //file upload
  files;

  

    
  constructor(private http: Http, private ppcDailyReportService: PPCDailyReportService, private datepipe: DatePipe, private searchPipe: SearchPipe){}

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/PPC/scheduleedit.component.js';

    this.getBindCustomer_ByName();
    this.getBindItems_ByAliasName();
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

  SearchMonthly(){
    var Month = $("#Month").val();
    if(Month == 'NULL')
    {
      alert('Please Select Month');
    }
    else{
    this.busy = this.ppcDailyReportService.getPPCDailyReport(Month,'','','','','','',).subscribe(res => {
        this.ResponseData = JSON.parse(res.JsonData);
        this.TopHeader = res.Headers;
        this.ResponseDataCopy = this.ResponseData;
        this.whichfunctioncalled = 'SearchMonthly';
        //this.TotalData(this.ResponseData);
      });
    }
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
      var natureofcomp_string = $("#NatureOfComp").val();

      this.FromDate = $("input[name=FromDate]").val();
      this.ToDate = $("input[name=ToDate]").val();

      //console.log(fromdate);  

      if(itemtype_string == 'NULL')
        itemtype_string = '';
      if(natureofcomp_string == 'NULL')
        natureofcomp_string = '';

      this.busy = this.ppcDailyReportService.getPPCDailyReport('',this.FromDate, this.ToDate, itemtype_string, natureofcomp_string, alias_string,customer_string).subscribe(res => {
        this.ResponseData = JSON.parse(res.JsonData);
        this.TopHeader = res.Headers;
        this.ResponseDataCopy = this.ResponseData;
        this.whichfunctioncalled = 'Search';
        //this.TotalData(this.ResponseData);
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
      if(this.whichfunctioncalled == 'Search')
        this.Search();
      else
        this.SearchMonthly();
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
      ETE(this.ResponseData);
  }

  TotalData(res){
    /*var i;
    this.totalRoundReq = 0;
    this.totalProRound = 0;
    this.totalScheduleQty = 0;
    this.totalOkQty = 0;
    for(i = 0; i < res.length; i++)
    {
      this.totalRoundReq += parseInt(res[i].RoundReq);
      this.totalProRound += parseInt(res[i].RoundNo);
      this.totalScheduleQty += parseInt(res[i].ScheduleQty);
      this.totalOkQty += parseInt(res[i].OkQty);
    }*/
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