import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChromeRejectionValueService } from '../../../Services/Chrome/chromelinerejection.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { SearchPipe } from './searchtable.pipe'
import { JsonDate } from '../../../Pipes/jsondate.pipe';
import {GenericTableComponent, GtConfig} from '@angular-generic-table/core';
import * as $ from 'jquery';

declare var ETE: any;

@Component({
    selector: 'Chrome-Rejection',
    templateUrl: 'chromelinerejection.component.html',
     providers: [ChromeRejectionValueService,DatePipe,SearchPipe, JsonDate]
})

export class ChromeRejectionValueComponet{
        busy: Subscription;
  ResponseData;
  ResponseDataCopy;
  //css class
  display_message;
  display_message_class;
  //local variables
  Alias_Names;
  Selected_Alias_Names; 
  orderby_string;
  orderbyA_string;
  loadingshift_string;
  Top_string;
  FromDate;
  ToDate;
  whichfunctioncalled;
  //search
  searchText
  json;
  //Total
  
  //Avg

   constructor(private chromelinerejectionService: ChromeRejectionValueService, private datepipe: DatePipe, private searchPipe: SearchPipe, private jsondate: JsonDate){}
    ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/ComponentJs/Chrome/chromelinerejection.componet.js';

  

    this.getBindItems_ByAliasName();
    this.search();
}
search()
  {
       

    //  var FromDate = $("input[name=FromDate]").val();
    //   var ToDate = $("input[name=ToDate]").val();  
     
      var fromdate = Date.now();
      var date = this.datepipe.transform(fromdate, 'dd/MM/yyyy');

     if($("input[name=FromDate]").val() == ''){
        this.FromDate = date;
     }
     else{
       this.FromDate = $("input[name=FromDate]").val();
     }


     if($("input[name=ToDate]").val() == ''){
        this.ToDate = date;
     } 
     else{
       this.ToDate = $("input[name=ToDate]").val();
     }
      
        this.Selected_Alias_Names = $("#Alias_Names").val();
        var alias_string = this.inStringBuilder(this.Selected_Alias_Names);
        
         var Top_string = $("#top").val();
         var Type_string = $("#type").val();
         var orderby_string = $("#orderby").val();
         var orderbyA_string = $("#orderbyA").val();

         if(Top_string == 'NULL')
            Top_string = '';
       if(Type_string == 'NULL')
             Type_string = '';
         if(orderby_string == 'NULL')
            orderby_string = '';
         if(orderbyA_string == 'NULL')
            orderbyA_string = '';

        this.busy = this.chromelinerejectionService.getChromeLineRejectionGrid(this.FromDate, this.ToDate, alias_string, Top_string, Type_string, orderby_string,orderbyA_string).subscribe(res => {
       //  this.ResponseData = res.Data;
        // this.ResponseDataCopy = res.Data;
     
   
        
           this.json = JSON.parse(res);
           this.ResponseDataCopy = this.json;
         //  this.TotalData(this.json);
         //  this.Avgdata(this.json);

     });

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
 
 ExportToExcel(){
    // if(this.ResponseData.length > 0)
      ETE(this.json);
   }

  getBindItems_ByAliasName(){
    this.chromelinerejectionService.getBindItems_ByAliasName().subscribe(res => {
      this.Alias_Names = res.Data;
    });
  }
  SearchTextBox(){
    var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
    if(filterData == 'Empty')
      this.json = this.ResponseDataCopy;
    else
      this.json = filterData;
  }
}