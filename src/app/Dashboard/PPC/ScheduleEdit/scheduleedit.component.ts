import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SearchPipe } from './searchtable.pipe'
import {GenericTableComponent, GtConfig} from '@angular-generic-table/core';
import { ScheduleEditService } from '../../../Services/PPC/scheduleedit.service'
import { Subscription } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'schedule-edit',
  templateUrl: './scheduleedit.component.html',
  providers: [ScheduleEditService, DatePipe, SearchPipe]
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

  constructor(private scheduleEditService: ScheduleEditService, private datepipe: DatePipe, private searchPipe: SearchPipe){}

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/ComponentJs/PPC/scheduleedit.component.js';

    this.getBindCustomer_ByName();
    this.getBindItems_ByAliasName();

    var d = new Date();
    $("#Month").val(d.getMonth());
    this.SearchMonthly();
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

      var FromDate = $("input[name=FromDate]").val();
      var ToDate = $("input[name=ToDate]").val();  

      this.FromDate = this.datepipe.transform(FromDate,"MM/dd/yyyy");
      this.ToDate = this.datepipe.transform(ToDate,"MM/dd/yyyy"); 

      if(itemtype_string == 'NULL')
        itemtype_string = '';
      if(natureofcomp_string == 'NULL')
        natureofcomp_string = '';

      this.busy = this.scheduleEditService.getScheduleEditData('',this.FromDate, this.ToDate, itemtype_string, natureofcomp_string, alias_string,customer_string).subscribe(res => {
        this.ResponseData = res.Data;
        this.ResponseDataCopy = res.Data;
        this.whichfunctioncalled = 'SearchMonthly';
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
    }, 2000);
  }

  updateCustomer(){
    this.scheduleEditService.updateCustomer(this.txtroundreq,this.txtscheduleqty,this.CustomerID,this.ItemID,this.ID).subscribe(res=>{
      if(res.Data)
      {
        this.display_message = 'Updated';
        this.display_message_class = 'alert alert-success alert-dismissible';
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

  onCloseUpdate(){
    if(this.whichfunctioncalled == 'Search')
      this.Search();
    else
      this.SearchMonthly();
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

  SearchTextBox(){
    var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
    if(filterData == 'Empty')
      this.ResponseData = this.ResponseDataCopy;
    else
      this.ResponseData = filterData;
  }
}
