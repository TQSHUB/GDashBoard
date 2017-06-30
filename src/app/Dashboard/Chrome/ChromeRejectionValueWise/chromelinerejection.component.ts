import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChromeRejectionValueService } from '../../../Services/Chrome/chromelinerejection.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { SearchPipeCRVal } from './searchtable.pipe'
import { JsonDate } from '../../../Pipes/jsondate.pipe';
import {GenericTableComponent, GtConfig} from '@angular-generic-table/core';
import * as $ from 'jquery';

declare var ETE: any;

@Component({
    selector: 'Chrome-Rejection',
    templateUrl: 'chromelinerejection.component.html',
     providers: [ChromeRejectionValueService,DatePipe,SearchPipeCRVal, JsonDate]
})

export class ChromeRejectionValueComponet{
  p;
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
  totTotalInspection = 0;
  totTotalInspectionValue = 0;
  totOkValue = 0;
  totHoldValue = 0;
  totRejectedValue = 0;
  totBufferingQtyValue = 0;
  totPittingValue = 0;
  totSkipPlatingValue = 0;
  totNickleShowValue = 0;
  totScratchMarksValue = 0;
  totPatchMarksValue = 0;
  totRoughnessValue = 0;
  totSilverMarkValue = 0;
  totCrBurnValue = 0;
  totWarPageValue = 0;
  totMouldingRejValue = 0;
  totDentValue = 0;
  totMismatchQtyValue = 0;
  totOtherValue = 0;
  totPinHole = 0;
  totDotPlastic = 0;
  totCopperBurning = 0;
  totWhiteMark = 0;
  totWaterMark = 0;
  totBlister = 0;
  totJigDamage = 0;
  totHandMouRej = 0;
 
  //Avg
  avgOkValue = 0;
  avgHoldValue = 0;
  avgRejectedValue = 0;
  avgBufferingQtyValue = 0;
  avgPittingValue = 0;
  avgSkipPlatingValue = 0;
  avgNickleShowValue = 0;
  avgScratchMarksValue = 0;
  avgPatchMarksValue = 0;
  avgRoughnessValue = 0;
  avgSilverMarkValue = 0;
  avgCrBurnValue = 0;
  avgWarPageValue = 0;
  avgMouldingRejValue = 0;
  avgDentValue = 0;
  avgMismatchQtyValue = 0;
  avgOtherValue = 0;
  avgPinHole = 0;
  avgDotPlastic = 0;
  avgCopperBurning = 0;
  avgWhiteMark = 0;
  avgWaterMark = 0;
  avgBlister = 0;
  avgJigDamage = 0;
  avgHandMouRej = 0;
  


   constructor(private chromelinerejectionService: ChromeRejectionValueService, private datepipe: DatePipe, private searchPipe: SearchPipeCRVal, private jsondate: JsonDate){}
    ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/Chrome/chromelinerejection.componet.js';

  

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
        this.totTotalInspection = 0;
        this.totTotalInspectionValue = 0;
        this.totOkValue = 0;
        this.totHoldValue = 0;
        this.totRejectedValue = 0;
        this.totBufferingQtyValue = 0;
        this.totPittingValue = 0;
        this.totSkipPlatingValue = 0;
        this.totNickleShowValue = 0;
        this.totScratchMarksValue = 0;
        this.totPatchMarksValue = 0;
        this.totRoughnessValue = 0;
        this.totSilverMarkValue = 0;
        this.totCrBurnValue = 0;
        this.totWarPageValue = 0;
        this.totMouldingRejValue = 0;
        this.totDentValue = 0;
        this.totMismatchQtyValue = 0;
        this.totOtherValue = 0;
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
                    this.totTotalInspection += parseInt(res[i].TotalInspection);
                    this.totTotalInspectionValue += parseInt(res[i].TotalInspectionValue);
                    this.totOkValue += parseInt(res[i].OkValue);
                    this.totHoldValue += parseInt(res[i].HoldValue);
                    this.totRejectedValue += parseInt(res[i].RejectedValue);
                    this.totBufferingQtyValue += parseInt(res[i].BufferingQtyValue);
                    this.totPittingValue += parseInt(res[i].PittingValue);
                    this.totSkipPlatingValue += parseInt(res[i].SkipPlatingValue);
                    this.totNickleShowValue += parseInt(res[i].NickleShowValue);
                    this.totScratchMarksValue += parseInt(res[i].ScratchMarksValue);
                    this.totPatchMarksValue += parseInt(res[i].PatchMarksValue);
                    this.totRoughnessValue += parseInt(res[i].RoughnessValue);
                    this.totSilverMarkValue += parseInt(res[i].SilverMarkValue);
                    this.totCrBurnValue += parseInt(res[i].CrBurnValue);
                    this.totWarPageValue += parseInt(res[i].WarPageValue);
                    this.totMouldingRejValue += parseInt(res[i].MouldingRejValue);
                    this.totDentValue += parseInt(res[i].DentValue);
                    this.totMismatchQtyValue += parseInt(res[i].MismatchQtyValue);
                    this.totOtherValue += parseInt(res[i].OtherValue);
                    this.totPinHole += parseInt(res[i].PinHole);
                    this.totDotPlastic += parseInt(res[i].DotPlastic);
                    this.totCopperBurning += parseInt(res[i].CopperBurning);
                    this.totWhiteMark += parseInt(res[i].WhiteMark);
                    this.totWaterMark += parseInt(res[i].WaterMark);
                    this.totBlister += parseInt(res[i].Blister);;
                    this.totJigDamage += parseInt(res[i].JigDamage);
                    this.totHandMouRej += parseInt(res[i].HandMouRej);
                   
     }
  }
 Avgdata(res){
    var i;
  this.avgOkValue = 0;
  this.avgHoldValue = 0;
  this.avgRejectedValue = 0;
  this.avgBufferingQtyValue = 0;
  this.avgPittingValue = 0;
  this.avgSkipPlatingValue = 0;
  this.avgNickleShowValue = 0;
  this.avgScratchMarksValue = 0;
  this.avgPatchMarksValue = 0;
  this.avgRoughnessValue = 0;
  this.avgSilverMarkValue = 0;
  this.avgCrBurnValue = 0;
  this.avgWarPageValue = 0;
  this.avgMouldingRejValue = 0;
  this.avgDentValue = 0;
  this.avgMismatchQtyValue = 0;
  this.avgOtherValue = 0;
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
            this.avgOkValue = Math.round((this.totOkValue)/( this.totTotalInspectionValue ) * 100);
            this.avgHoldValue = Math.round((this.totHoldValue)/( this.totTotalInspectionValue ) * 100);
            this.avgRejectedValue = Math.round((this.totRejectedValue)/( this.totTotalInspectionValue ) * 100);
            this.avgBufferingQtyValue = Math.round((this.totBufferingQtyValue)/( this.totTotalInspectionValue ) * 100);
            this.avgPittingValue = Math.round((this.totPittingValue)/( this.totTotalInspectionValue ) * 100);
            this.avgSkipPlatingValue = Math.round((this.totSkipPlatingValue)/( this.totTotalInspectionValue ) * 100);
            this.avgNickleShowValue = Math.round((this.totNickleShowValue)/( this.totTotalInspectionValue ) * 100);
            this.avgScratchMarksValue = Math.round((this.totScratchMarksValue)/( this.totTotalInspectionValue ) * 100);
            this.avgPatchMarksValue = Math.round((this.totPatchMarksValue)/( this.totTotalInspectionValue ) * 100);
            this.avgRoughnessValue = Math.round((this.totRoughnessValue)/( this.totTotalInspectionValue ) * 100);
            this.avgSilverMarkValue = Math.round((this.totSilverMarkValue)/( this.totTotalInspectionValue ) * 100);
            this.avgCrBurnValue = Math.round((this.totCrBurnValue)/( this.totTotalInspectionValue ) * 100);
            this.avgWarPageValue = Math.round((this.totWarPageValue)/( this.totTotalInspectionValue ) * 100);
            this.avgMouldingRejValue = Math.round((this.totMouldingRejValue)/( this.totTotalInspectionValue ) * 100);
            this.avgDentValue = Math.round((this.totDentValue)/( this.totTotalInspectionValue ) * 100);
            this.avgMismatchQtyValue = Math.round((this.totMismatchQtyValue)/( this.totTotalInspectionValue ) * 100);
            this.avgOtherValue = Math.round((this.totOtherValue)/( this.totTotalInspectionValue ) * 100);
            this.avgPinHole = Math.round((this.totPinHole)/( this.totTotalInspectionValue ) * 100);
            this.avgDotPlastic = Math.round((this.totDotPlastic)/( this.totTotalInspectionValue ) * 100);
            this.avgCopperBurning = Math.round((this.totCopperBurning)/( this.totTotalInspectionValue ) * 100);
            this.avgWhiteMark = Math.round((this.totWhiteMark)/( this.totTotalInspectionValue ) * 100);
            this.avgWaterMark = Math.round((this.totWaterMark)/( this.totTotalInspectionValue ) * 100);
            this.avgBlister = Math.round((this.totBlister)/( this.totTotalInspectionValue ) * 100);
            this.avgJigDamage = Math.round((this.totJigDamage)/( this.totTotalInspectionValue ) * 100);
            this.avgHandMouRej = Math.round((this.totHandMouRej)/( this.totTotalInspectionValue ) * 100);
           
    }
 }
 ExportToExcel(){
      var date= new Date();
      ETE('ChromeLineRejection_'+ this.datepipe.transform(date,'dd/MM/yyyy') +'.xls');
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