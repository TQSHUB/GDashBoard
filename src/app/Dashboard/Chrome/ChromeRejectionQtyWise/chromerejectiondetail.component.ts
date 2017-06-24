import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChromeRejectionQtyService } from '../../../Services/Chrome/chromerejectiondetail.service';
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
    templateUrl: 'chromerejectiondetail.component.html',
     providers: [ChromeRejectionQtyService,DatePipe,SearchPipe, JsonDate]
})

export class ChromeRejectionQtyComponet{
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
   totTotalInsp = 0;
   totOkQty = 0;
   totHoldQty = 0;
   totRejectedQty = 0;
   totMismatchQty = 0;
   totBufferingQty = 0;
   totPitting = 0;
   totSkipPlating = 0;
   totNickleShow = 0;
   totScratchMarks = 0;
   totPatchMarks = 0;
   totRoughness = 0;
   totSilverMark = 0;
   totCrBurn = 0;
   totWarPage = 0;
   totMouldingRej = 0;
   totDent = 0;
   totOther = 0;
   totPinHole = 0;
   totDotPlastic = 0;
   totCopperBurning = 0;
   totWhiteMark = 0;
   totWaterMark = 0;
   totBlister = 0;
   totJigDamage = 0;
   totHandMouRej = 0;
                           
  //Avg
  
   avgOkQty = 0;
   avgHoldQty = 0;
   avgRejectedQty = 0;
   avgMismatchQty = 0;
   avgBufferingQty = 0;
   avgPitting = 0;
   avgSkipPlating = 0;
   avgNickleShow = 0;
   avgScratchMarks = 0;
   avgPatchMarks = 0;
   avgRoughness = 0;
   avgSilverMark = 0;
   avgCrBurn = 0;
   avgWarPage = 0;
   avgMouldingRej = 0;
   avgDent = 0;
   avgOther = 0;
   avgPinHole = 0;
   avgDotPlastic = 0;
   avgCopperBurning = 0;
   avgWhiteMark = 0;
   avgWaterMark = 0;
   avgBlister = 0;
   avgJigDamage = 0;
   avgHandMouRej = 0;

   constructor(private chromerejectiondetailService: ChromeRejectionQtyService, private datepipe: DatePipe, private searchPipe: SearchPipe, private jsondate: JsonDate){}
    ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/Chrome/chromerejectiondetail.component.js';

  

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

        this.busy = this.chromerejectiondetailService.getChromeRejectionDetailGrid(this.FromDate, this.ToDate, alias_string, Top_string, Type_string, orderby_string,orderbyA_string).subscribe(res => {
       //  this.ResponseData = res.Data;
        // this.ResponseDataCopy = res.Data;
     
   
        
           this.json = JSON.parse(res);
           this.ResponseDataCopy = this.json;
           this.TotalData(this.json);
           this.Avgdata(this.json);

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
 TotalData(res){
    var i;
   this.totTotalInsp = 0;
   this.totOkQty = 0;
   this.totHoldQty = 0;
   this.totRejectedQty = 0;
   this.totMismatchQty = 0;
   this.totBufferingQty = 0;
   this.totPitting = 0;
   this.totSkipPlating = 0;
   this.totNickleShow = 0;
   this.totScratchMarks = 0;
   this.totPatchMarks = 0;
   this.totRoughness = 0;
   this.totSilverMark = 0;
   this.totCrBurn = 0;
   this.totWarPage = 0;
   this.totMouldingRej = 0;
   this.totDent = 0;
   this.totOther = 0;
   this.totPinHole = 0;
   this.totDotPlastic = 0;
   this.totCopperBurning = 0;
   this.totWhiteMark = 0;
   this.totWaterMark = 0;
   this.totBlister = 0;
   this.totJigDamage = 0;
   this.totHandMouRej = 0;
  
     for(i=0; i < res.length; i++)
     {             
                    this.totTotalInsp += parseInt(res[i].TotalInsp);
                    this.totOkQty += parseInt(res[i].OkQty);
                    this.totHoldQty += parseInt(res[i].HoldQty);
                    this.totRejectedQty += parseInt(res[i].RejectedQty);
                    this.totMismatchQty += parseInt(res[i].MismatchQty);
                    this.totBufferingQty += parseInt(res[i].BufferingQty);
                    this.totPitting += parseInt(res[i].Pitting);
                    this.totSkipPlating += parseInt(res[i].SkipPlating);
                    this.totNickleShow += parseInt(res[i].NickleShow );
                    this.totScratchMarks += parseInt(res[i].ScratchMarks);
                    this.totPatchMarks += parseInt(res[i].PatchMarks);
                    this.totRoughness += parseInt(res[i].Roughness);
                    this.totSilverMark += parseInt(res[i].SilverMark);
                    this.totCrBurn += parseInt(res[i].CrBurn );
                    this.totWarPage += parseInt(res[i].WarPage);
                    this.totMouldingRej += parseInt(res[i].MouldingRej);
                    this.totDent += parseInt(res[i].Dent);
                    this.totOther += parseInt(res[i].Other);
                    this.totPinHole += parseInt(res[i].PinHole);
                    this.totDotPlastic += parseInt(res[i].DotPlastic);
                    this.totCopperBurning += parseInt(res[i].CopperBurning );
                    this.totWhiteMark += parseInt(res[i].WhiteMark);
                    this.totWaterMark += parseInt(res[i].WaterMark);
                    this.totBlister += parseInt(res[i].Blister);
                    this.totJigDamage += parseInt(res[i].JigDamage);
                    this.totHandMouRej += parseInt(res[i].HandMouRej);
                   
     }

 }
  Avgdata(res){
    var i;
   this.avgOkQty = 0;
   this.avgHoldQty = 0;
   this.avgRejectedQty = 0;
   this.avgMismatchQty = 0;
   this.avgBufferingQty = 0;
   this.avgPitting = 0;
   this.avgSkipPlating = 0;
   this.avgNickleShow = 0;
   this.avgScratchMarks = 0;
   this.avgPatchMarks = 0;
   this.avgRoughness = 0;
   this.avgSilverMark = 0;
   this.avgCrBurn = 0;
   this.avgWarPage = 0;
   this.avgMouldingRej = 0;
   this.avgDent = 0;
   this.avgOther = 0;
   this.avgPinHole = 0;
   this.avgDotPlastic = 0;
   this.avgCopperBurning = 0;
   this.avgWhiteMark = 0;
   this.avgWaterMark = 0;
   this.avgBlister = 0;
   this.avgJigDamage = 0;
   this.avgHandMouRej = 0;

     for(i = 0; i < res.length; i++)
    {
            this.avgOkQty = Math.round((this.totOkQty)/( this.totTotalInsp ) * 100);
            this.avgHoldQty = Math.round((this.totHoldQty)/( this.totTotalInsp ) * 100);
            this.avgRejectedQty = Math.round((this.totRejectedQty)/( this.totTotalInsp ) * 100);
            this.avgMismatchQty = Math.round((this.totMismatchQty)/( this.totTotalInsp ) * 100);
            this.avgBufferingQty = Math.round((this.totBufferingQty)/( this.totTotalInsp ) * 100);
            this.avgPitting = Math.round((this.totPitting)/( this.totTotalInsp ) * 100);
            this.avgSkipPlating = Math.round((this.totSkipPlating)/( this.totTotalInsp ) * 100);
            this.avgNickleShow = Math.round((this.totNickleShow)/( this.totTotalInsp ) * 100);
            this.avgScratchMarks = Math.round((this.totScratchMarks)/( this.totTotalInsp ) * 100);
            this.avgPatchMarks = Math.round((this.totPatchMarks)/( this.totTotalInsp ) * 100);
            this.avgRoughness = Math.round((this.totRoughness)/( this.totTotalInsp ) * 100);
            this.avgSilverMark = Math.round((this.totSilverMark)/( this.totTotalInsp ) * 100);
            this.avgCrBurn = Math.round((this.totCrBurn)/( this.totTotalInsp ) * 100);
            this.avgWarPage = Math.round((this.totWarPage)/( this.totTotalInsp ) * 100);
            this.avgMouldingRej = Math.round((this.totMouldingRej)/( this.totTotalInsp ) * 100);
            this.avgDent = Math.round((this.totDent)/( this.totTotalInsp ) * 100);
            this.avgOther = Math.round((this.totOther)/( this.totTotalInsp ) * 100);
            this.avgPinHole = Math.round((this.totPinHole)/( this.totTotalInsp ) * 100);
            this.avgDotPlastic = Math.round((this.totDotPlastic)/( this.totTotalInsp ) * 100);
            this.avgCopperBurning = Math.round((this.totCopperBurning)/( this.totTotalInsp ) * 100);
            this.avgWhiteMark = Math.round((this.totWhiteMark)/( this.totTotalInsp ) * 100);
            this.avgWaterMark = Math.round((this.totWaterMark)/( this.totTotalInsp ) * 100);
            this.avgBlister = Math.round((this.totBlister)/( this.totTotalInsp ) * 100);
            this.avgJigDamage = Math.round((this.totJigDamage)/( this.totTotalInsp ) * 100);
            this.avgHandMouRej = Math.round((this.totHandMouRej)/( this.totTotalInsp ) * 100);
    }
  }
 ExportToExcel(){
    // if(this.ResponseData.length > 0)
      ETE();
   }

  getBindItems_ByAliasName(){
    this.chromerejectiondetailService.getBindItems_ByAliasName().subscribe(res => {
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