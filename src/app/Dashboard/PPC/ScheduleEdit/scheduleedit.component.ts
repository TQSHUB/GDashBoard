import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { SearchPipe } from './searchtable.pipe'
import {GenericTableComponent, GtConfig} from '@angular-generic-table/core';
import { ScheduleEditService } from '../../../Services/PPC/scheduleedit.service'
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var ETE: any;

@Component({
  selector: 'ppc-schedule-edit',
  templateUrl: './scheduleedit.component.html',
  providers: [ScheduleEditService, DatePipe, SearchPipe],
})
export class ScheduleEditComponent {
  busy: Subscription;
  ResponseData;
  ResponseDataCopy;
  //css class
  display_message;
  display_message_class;
  //local variables
  Alias_Names;
  Customer_Names;
  Selected_Alias_Names; 
  Selected_Customer_Names;
  FromDate;
  ToDate;
  whichfunctioncalled;
  //update fileds
  txtroundreq;
  txtscheduleqty;
  CustomerID;
  ItemID;
  ID;
  //search
  searchText
  //file upload
  files;
  //Total
  totalRoundReq = 0;
  totalProRound = 0;
  totalScheduleQty = 0;
  totalOkQty = 0;


  constructor(private http: Http, private scheduleEditService: ScheduleEditService, private datepipe: DatePipe, private searchPipe: SearchPipe){}

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/ComponentJs/PPC/scheduleedit.component.js';

    this.getBindCustomer_ByName();
    this.getBindItems_ByAliasName();

    var d = new Date();
    $("#Month").val(d.getMonth() + 1);
    this.SearchMonthly();
  }

  TotalData(res){
    var i;
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
    }
  }

  SearchMonthly(){
    var Month = $("#Month").val();
    if(Month == 'NULL')
    {
      alert('Please Select Month');
    }
    else{
    this.busy = this.scheduleEditService.getScheduleEditData(Month,'','','','','','',).subscribe(res => {
        this.ResponseData = res.Data;
        this.ResponseDataCopy = res.Data;
        this.whichfunctioncalled = 'SearchMonthly';
        this.TotalData(this.ResponseData);
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

      this.busy = this.scheduleEditService.getScheduleEditData('',this.FromDate, this.ToDate, itemtype_string, natureofcomp_string, alias_string,customer_string).subscribe(res => {
        this.ResponseData = res.Data;
        this.ResponseDataCopy = res.Data;
        this.whichfunctioncalled = 'SearchMonthly';
        this.TotalData(this.ResponseData);
      });
  }

  clearValues(){
    this.txtroundreq = '';
    this.txtscheduleqty = '';
    this.CustomerID = '';
    this.ID = '';
    this.ItemID = '';

    setTimeout(() => {
      this.display_message = '';
      this.display_message_class = '';
    }, 4000);
  }

  updateCustomer(){
    this.scheduleEditService.updateCustomer(this.txtroundreq,this.txtscheduleqty,this.CustomerID,this.ItemID,this.ID).subscribe(res=>{
      if(res.Data)
      {
        if(this.whichfunctioncalled == 'Search')
          this.Search();
        else
          this.SearchMonthly();
          this.clearValues();
      }
      else
      {
        this.display_message = 'Error';
        this.display_message_class = 'alert alert-danger alert-dismissible';
        this.clearValues();
      }
    });
  }

  selectedCustomer(customer){
    this.txtroundreq = customer.RoundReq;
    this.txtscheduleqty = customer.ScheduleQty;
    this.CustomerID = customer.CustomerID;
    this.ItemID = customer.ItemID;
    this.ID = customer.Id;
  }

  inStringBuilder(a: any){
    var i;
    var stringBuilder = '';
    for(i=0; i < a.length; i++)
    {
      if(i == a.length -1)
        stringBuilder += a[i];
      else
        stringBuilder += a[i] + ',';
    }
    return stringBuilder;
  }
  getBindItems_ByAliasName(){
    this.scheduleEditService.getBindItems_ByAliasName().subscribe(res => {
      this.Alias_Names = res.Data;
    });
  }
  getBindCustomer_ByName(){
    this.scheduleEditService.getBindCustomer_ByName().subscribe(res => {
      this.Customer_Names = res.Data;
    });
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
    if(this.ResponseData.length > 0)
      ETE(this.ResponseData);
    else
    {
      var response;
      this.busy = this.scheduleEditService.getAllData().subscribe(res => {
        response = JSON.parse(res);
        ETE(response);
      });     
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
