import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SatinLineSummaryService } from '../../../Services/Satin/satinlinesummary.service';
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
    selector: 'Satin-lineSummary',
    templateUrl: 'satinlinesummary.component.html',
      providers: [SatinLineSummaryService,DatePipe,SearchPipe, JsonDate]
})

export class SatinLineSummary{
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
  Top_string;
  FromDate;
  ToDate;
  whichfunctioncalled;
   //search
  searchText
  json;
  // total
  totProductionvalue = 0;
  totTotalInspectionValue = 0;
  totOkValue = 0;
  totHoldValue = 0;
  totRejectedValue = 0;
  totBufferingQtyValue = 0;
  totPinHoleValue = 0;
  totPitmarksValue = 0;
  totSkipPlatingValue = 0;
  totDotPlasticValue = 0;
  totWhitemarkValue = 0;
  totChormBurningValue = 0;
  totDentMarksValue = 0;
  totJigDamageValue = 0;
  totHighGlossValue = 0;
  totLowGlossValue = 0;
  totShadeVariationValue = 0;
  totNickelValue = 0;
  totScratchesValue = 0;
  totRoughnessValue = 0;
  totBlisterValue = 0;
  totBlackSpotValue = 0;
  totSatinMarkValue = 0;
  totTouchBurningValue = 0;
  totChemicalMarkValue = 0;
  totWaterMarkValue = 0;
  totMismatchQtyValue = 0;
  totOtherValue = 0;
  totPatchMarkValue = 0;
  totCopperBurningValue = 0;
  totProMouRejValue = 0;
  totHandMouRejValue = 0;
  totSilverMarkValue = 0;
  totWarPageValue = 0;
  //Avg
  avgProductionvalue = 0;
  avgTotalInspectionValue = 0;
  avgOkValue = 0;
  avgHoldValue = 0;
  avgRejectedValue = 0;
  avgBufferingQtyValue = 0;
  avgPinHoleValue = 0;
  avgPitmarksValue = 0;
  avgSkipPlatingValue = 0;
  avgDotPlasticValue = 0;
  avgWhitemarkValue = 0;
  avgChormBurningValue = 0;
  avgDentMarksValue = 0;
  avgJigDamageValue = 0;
  avgHighGlossValue = 0;
  avgLowGlossValue = 0;
  avgShadeVariationValue = 0;
  avgNickelValue = 0;
  avgScratchesValue = 0;
  avgRoughnessValue = 0;
  avgBlisterValue = 0;
  avgBlackSpotValue = 0;
  avgSatinMarkValue = 0;
  avgTouchBurningValue = 0;
  avgChemicalMarkValue = 0;
  avgWaterMarkValue = 0;
  avgMismatchQtyValue = 0;
  avgOtherValue = 0;
  avgPatchMarkValue = 0;
  avgCopperBurningValue = 0;
  avgProMouRejValue = 0;
  avgHandMouRejValue = 0;
  avgSilverMarkValue = 0;
  avgWarPageValue = 0;

   constructor(private satinlinesummaryService: SatinLineSummaryService, private datepipe: DatePipe, private searchPipe: SearchPipe, private jsondate: JsonDate){}


ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/ComponentJs/Satin/satinlinesummary.component.js';

 
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
         var orderby_string = $("#orderby").val();
         var orderbyA_string = $("#orderbyA").val();

         if(Top_string == 'NULL')
            Top_string = '';
         if(orderby_string == 'NULL')
            orderby_string = '';
         if(orderbyA_string == 'NULL')
            orderbyA_string = '';

        this.busy = this.satinlinesummaryService.getSatinlinesummaryGrid(this.FromDate,this.ToDate, alias_string, Top_string, orderby_string,orderbyA_string).subscribe(res => {
      
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
  TotalData (res){
     var i;
  this.totProductionvalue = 0;
  this.totTotalInspectionValue = 0;
  this.totOkValue = 0;
  this.totHoldValue = 0;
  this.totRejectedValue = 0;
  this.totBufferingQtyValue = 0;
  this.totPinHoleValue = 0;
  this.totPitmarksValue = 0;
  this.totSkipPlatingValue = 0;
  this.totDotPlasticValue = 0;
  this.totWhitemarkValue = 0;
  this.totChormBurningValue = 0;
  this.totDentMarksValue = 0;
  this.totJigDamageValue = 0;
  this.totHighGlossValue = 0;
  this.totLowGlossValue = 0;
  this.totShadeVariationValue = 0;
  this.totNickelValue = 0;
  this.totScratchesValue = 0;
  this.totRoughnessValue = 0;
  this.totBlisterValue = 0;
  this.totBlackSpotValue = 0;
  this.totSatinMarkValue = 0;
  this.totTouchBurningValue = 0;
  this.totChemicalMarkValue = 0;
  this.totWaterMarkValue = 0;
  this.totMismatchQtyValue = 0;
  this.totOtherValue = 0;
  this.totPatchMarkValue = 0;
  this.totCopperBurningValue = 0;
  this.totProMouRejValue = 0;
  this.totHandMouRejValue = 0;
  this.totSilverMarkValue = 0;
  this.totWarPageValue = 0;

  for(i = 0; i < res.length; i++)
    {
                this.totProductionvalue += parseInt(res[i].Productionvalue);
                this.totTotalInspectionValue += parseInt(res[i].TotalInspectionValue);
                this.totOkValue += parseInt(res[i].OkValue);
                this.totHoldValue += parseInt(res[i].HoldValue);
                this.totRejectedValue += parseInt(res[i].RejectedValue);
                this.totBufferingQtyValue += parseInt(res[i].BufferingQtyValue);
                this.totPinHoleValue += parseInt(res[i].PinHoleValue);
                this.totPitmarksValue += parseInt(res[i].PitmarksValue);
                this.totSkipPlatingValue += parseInt(res[i].SkipPlatingValue);
                this.totDotPlasticValue += parseInt(res[i].DotPlasticValue);
                this.totWhitemarkValue += parseInt(res[i].WhitemarkValue);
                this.totChormBurningValue += parseInt(res[i].ChormBurningValue);
                this.totDentMarksValue += parseInt(res[i].DentMarksValue);
                this.totJigDamageValue += parseInt(res[i].JigDamageValue);
                this.totHighGlossValue += parseInt(res[i].HighGlossValue);
                this.totLowGlossValue += parseInt(res[i].LowGlossValue);
                this.totShadeVariationValue += parseInt(res[i].ShadeVariationValue);
                this.totNickelValue += parseInt(res[i].NickelValue);
                this.totScratchesValue += parseInt(res[i].ScratchesValue);
                this.totRoughnessValue += parseInt(res[i].RoughnessValue);
                this.totBlisterValue += parseInt(res[i].BlisterValue);
                this.totBlackSpotValue += parseInt(res[i].BlackSpotValue);
                this.totSatinMarkValue += parseInt(res[i].SatinMarkValue);
                this.totTouchBurningValue += parseInt(res[i].TouchBurningValue);
                this.totChemicalMarkValue += parseInt(res[i].ChemicalMarkValue);
                this.totWaterMarkValue += parseInt(res[i].WaterMarkValue);
                this.totMismatchQtyValue += parseInt(res[i].MismatchQtyValue);
                this.totOtherValue += parseInt(res[i].OtherValue);
                this.totPatchMarkValue += parseInt(res[i].PatchMarkValue);
                this.totCopperBurningValue += parseInt(res[i].CopperBurningValue);
                this.totProMouRejValue += parseInt(res[i].ProMouRejValue);
                this.totHandMouRejValue += parseInt(res[i].HandMouRejValue);
                this.totSilverMarkValue += parseInt(res[i].SilverMarkValue);
                this.totWarPageValue += parseInt(res[i].WarPageValue);

    }
  }
   Avgdata(res){
       var i;
        this.avgOkValue = 0;
        this.avgHoldValue = 0;
        this.avgRejectedValue = 0;
        this.avgBufferingQtyValue = 0;
        this.avgPinHoleValue = 0;
        this.avgPitmarksValue = 0;
        this.avgSkipPlatingValue = 0;
        this.avgDotPlasticValue = 0;
        this.avgWhitemarkValue = 0;
        this.avgChormBurningValue = 0;
        this.avgDentMarksValue = 0;
        this.avgJigDamageValue = 0;
        this.avgHighGlossValue = 0;
        this.avgLowGlossValue = 0;
        this.avgShadeVariationValue = 0;
        this.avgNickelValue = 0;
        this.avgScratchesValue = 0;
        this.avgRoughnessValue = 0;
        this.avgBlisterValue = 0;
        this.avgBlackSpotValue = 0;
        this.avgSatinMarkValue = 0;
        this.avgTouchBurningValue = 0;
        this.avgChemicalMarkValue = 0;
        this.avgWaterMarkValue = 0;
        this.avgMismatchQtyValue = 0;
        this.avgOtherValue = 0;
        this.avgPatchMarkValue = 0;
        this.avgCopperBurningValue = 0;
        this.avgProMouRejValue = 0;
        this.avgHandMouRejValue = 0;
        this.avgSilverMarkValue = 0;
        this.avgWarPageValue = 0;

        for(i = 0; i < res.length; i++)
        {
 
        this.avgOkValue = Math.round((this.totOkValue)/( this.totTotalInspectionValue ) * 100);
        this.avgHoldValue = Math.round((this.totHoldValue)/( this.totTotalInspectionValue ) * 100);
        this.avgRejectedValue = Math.round((this.totRejectedValue)/( this.totTotalInspectionValue ) * 100);
        this.avgBufferingQtyValue = Math.round((this.totBufferingQtyValue)/( this.totTotalInspectionValue ) * 100);
        this.avgPinHoleValue = Math.round((this.totPinHoleValue)/( this.totTotalInspectionValue ) * 100);
        this.avgPitmarksValue = Math.round((this.totPitmarksValue)/( this.totTotalInspectionValue ) * 100);
        this.avgSkipPlatingValue = Math.round((this.totSkipPlatingValue)/( this.totTotalInspectionValue ) * 100);
        this.avgDotPlasticValue = Math.round((this.totDotPlasticValue)/( this.totTotalInspectionValue ) * 100);
        this.avgWhitemarkValue = Math.round((this.totWhitemarkValue)/( this.totTotalInspectionValue ) * 100);
        this.avgChormBurningValue = Math.round((this.totChormBurningValue)/( this.totTotalInspectionValue ) * 100);
        this.avgDentMarksValue = Math.round((this.totDentMarksValue)/( this.totTotalInspectionValue ) * 100);
        this.avgJigDamageValue = Math.round((this.totJigDamageValue)/( this.totTotalInspectionValue ) * 100);
        this.avgHighGlossValue = Math.round((this.totHighGlossValue)/( this.totTotalInspectionValue ) * 100);
        this.avgLowGlossValue = Math.round((this.totLowGlossValue)/( this.totTotalInspectionValue ) * 100);
        this.avgShadeVariationValue = Math.round((this.totShadeVariationValue)/( this.totTotalInspectionValue ) * 100);
        this.avgNickelValue = Math.round((this.totNickelValue)/( this.totTotalInspectionValue ) * 100);
        this.avgScratchesValue = Math.round((this.totScratchesValue)/( this.totTotalInspectionValue ) * 100);
        this.avgRoughnessValue = Math.round((this.totRoughnessValue)/( this.totTotalInspectionValue ) * 100);
        this.avgBlisterValue = Math.round((this.totBlisterValue)/( this.totTotalInspectionValue ) * 100);
        this.avgBlackSpotValue = Math.round((this.totBlackSpotValue)/( this.totTotalInspectionValue ) * 100);
        this.avgSatinMarkValue = Math.round((this.totSatinMarkValue)/( this.totTotalInspectionValue ) * 100);
        this.avgTouchBurningValue = Math.round((this.totTouchBurningValue)/( this.totTotalInspectionValue ) * 100);
        this.avgChemicalMarkValue = Math.round((this.totChemicalMarkValue)/( this.totTotalInspectionValue ) * 100);
        this.avgWaterMarkValue = Math.round((this.totWaterMarkValue)/( this.totTotalInspectionValue ) * 100);
        this.avgMismatchQtyValue = Math.round((this.totMismatchQtyValue)/( this.totTotalInspectionValue ) * 100);
        this.avgOtherValue = Math.round((this.totOtherValue)/( this.totTotalInspectionValue ) * 100);
        this.avgPatchMarkValue = Math.round((this.totPatchMarkValue)/( this.totTotalInspectionValue ) * 100);
        this.avgCopperBurningValue = Math.round((this.totCopperBurningValue)/( this.totTotalInspectionValue ) * 100);
        this.avgProMouRejValue = Math.round((this.totProMouRejValue)/( this.totTotalInspectionValue ) * 100);
        this.avgHandMouRejValue = Math.round((this.totHandMouRejValue)/( this.totTotalInspectionValue ) * 100);
        this.avgSilverMarkValue = Math.round((this.totSilverMarkValue)/( this.totTotalInspectionValue ) * 100);
        this.avgWarPageValue = Math.round((this.totWarPageValue)/( this.totTotalInspectionValue ) * 100);
        }
   }
   getBindItems_ByAliasName(){
    this.satinlinesummaryService.getBindItems_ByAliasName().subscribe(res => {
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
   ExportToExcel(){
    // if(this.ResponseData.length > 0)
      ETE(this.json);
   }
}