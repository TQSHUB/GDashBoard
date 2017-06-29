import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SatinRejectionQtyService } from '../../../Services/Satin/satinrejectiondetail.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { SearchPipeSRQty } from './searchtable.pipe'
import { JsonDate } from '../../../Pipes/jsondate.pipe';
import {GenericTableComponent, GtConfig} from '@angular-generic-table/core';
import * as $ from 'jquery';

declare var ETE: any;


@Component({
    selector: 'Satin-Rejection',
    templateUrl: 'satinrejectiondetail.component.html',
    providers: [SatinRejectionQtyService,DatePipe,SearchPipeSRQty, JsonDate]
})

export class SatinRejectionQtyComponet{
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

  LowGlass;
  date;
  //Total
  totTotalInsp = 0;
  totOkQty = 0;
  totHoldQty = 0;
  totRejectedQty = 0;
  totMismatchQty = 0;
  totBufferingQty = 0;
  totPinHole = 0;
  totPitmarks = 0;
  totSkipPlating = 0;
  totDotPlastic = 0;
  totWhiteMark = 0;
  totChromBurning = 0;
  totDentMarks = 0;
  totJigDamage = 0;
  totHighGloss = 0;
  totLowGloss = 0;
  totshadeVariation = 0;
  totNickel = 0;
  totScratches = 0;
  totRoughness = 0;
  totBlister = 0;
  totBlackSpot = 0;
  totsatinMark = 0;
  totTouchBurning = 0;
  totChemicalMark = 0;
  totWaterMark = 0;
  totOther = 0;
  totPatchMark = 0;
  totCopperBurning = 0;
  totProMouRej = 0;
  totHandMouRej = 0;
  totSilverMark = 0;
  totWarPage = 0;
 
  //Avg
  avgTotalInsp = 0;
  avgOkQty = 0;
  avgHoldQty = 0;
  avgRejectedQty = 0;
  avgMismatchQty = 0;
  avgBufferingQty = 0;
  avgPinHole = 0;
  avgPitmarks = 0;
  avgSkipPlating = 0;
  avgDotPlastic = 0;
  avgWhiteMark = 0;
  avgChromBurning = 0;
  avgDentMarks = 0;
  avgJigDamage = 0;
  avgHighGloss = 0;
  avgLowGloss = 0;
  avgshadeVariation = 0;
  avgNickel = 0;
  avgScratches = 0;
  avgRoughness = 0;
  avgBlister = 0;
  avgBlackSpot = 0;
  avgsatinMark = 0;
  avgTouchBurning = 0;
  avgChemicalMark = 0;
  avgWaterMark = 0;
  avgOther = 0;
  avgPatchMark = 0;
  avgCopperBurning = 0;
  avgProMouRej = 0;
  avgHandMouRej = 0;
  avgSilverMark = 0;
  avgWarPage = 0;

    constructor(private satinrejectiondetailService: SatinRejectionQtyService, private datepipe: DatePipe, private searchPipe: SearchPipeSRQty, private jsondate: JsonDate){}
    ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/Satin/satinrejectiondetail.component.js';

  

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

        this.busy = this.satinrejectiondetailService.getSatinRejectionDetailGrid(this.FromDate, this.ToDate, alias_string, Top_string, Type_string, orderby_string,orderbyA_string).subscribe(res => {
       //  this.ResponseData = res.Data;
        // this.ResponseDataCopy = res.Data;
     
   
        
           this.json = JSON.parse(res);
           this.ResponseDataCopy = this.json;
           this.TotalAvgData(this.json);

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

   TotalAvgData(res){
    var i;
  this.totTotalInsp = 0;
  this.totOkQty = 0;
  this.totHoldQty = 0;
  this.totRejectedQty = 0;
  this.totMismatchQty = 0;
  this.totBufferingQty = 0;
  this.totPinHole = 0;
  this.totPitmarks = 0;
  this.totSkipPlating = 0;
  this.totDotPlastic = 0;
  this.totWhiteMark = 0;
  this.totChromBurning = 0;
  this.totDentMarks = 0;
  this.totJigDamage = 0;
  this.totHighGloss = 0;
  this.totLowGloss = 0;
  this.totshadeVariation = 0;
  this.totNickel = 0;
  this.totScratches = 0;
  this.totRoughness = 0;
  this.totBlister = 0;
  this.totBlackSpot = 0;
  this.totsatinMark = 0;
  this.totTouchBurning = 0;
  this.totChemicalMark = 0;
  this.totWaterMark = 0;
  this.totOther = 0;
  this.totPatchMark = 0;
  this.totCopperBurning = 0;
  this.totProMouRej = 0;
  this.totHandMouRej = 0;
  this.totSilverMark = 0;
  this.totWarPage = 0;

  this.avgOkQty = 0;
  this.avgHoldQty = 0;
  this.avgRejectedQty = 0;
  this.avgMismatchQty = 0;
  this.avgBufferingQty = 0;
  this.avgPinHole = 0;
  this.avgPitmarks = 0;
  this.avgSkipPlating = 0;
  this.avgDotPlastic = 0;
  this.avgWhiteMark = 0;
  this.avgChromBurning = 0;
  this.avgDentMarks = 0;
  this.avgJigDamage = 0;
  this.avgHighGloss = 0;
  this.avgLowGloss = 0;
  this.avgshadeVariation = 0;
  this.avgNickel = 0;
  this.avgScratches = 0;
  this.avgRoughness = 0;
  this.avgBlister = 0;
  this.avgBlackSpot = 0;
  this.avgsatinMark = 0;
  this.avgTouchBurning = 0;
  this.avgChemicalMark = 0;
  this.avgWaterMark = 0;
  this.avgOther = 0;
  this.avgPatchMark = 0;
  this.avgCopperBurning = 0;
  this.avgProMouRej = 0;
  this.avgHandMouRej = 0;
  this.avgSilverMark = 0;
  this.avgWarPage = 0;

 for(i=0; i < res.length; i++)
     {             
                    this.totTotalInsp += parseInt(res[i].TotalInsp);
                    this.totOkQty += parseInt(res[i].OkQty);
                    this.totHoldQty += parseInt(res[i].HoldQty);
                    this.totRejectedQty += parseInt(res[i].RejectedQty);
                    this.totMismatchQty += parseInt(res[i].MismatchQty);
                    this.totBufferingQty += parseInt(res[i].BufferingQty);
                    this.totPinHole += parseInt(res[i].PinHole);
                    this.totPitmarks += parseInt(res[i].Pitmarks);
                    this.totSkipPlating += parseInt(res[i].SkipPlating);
                    this.totDotPlastic += parseInt(res[i].DotPlastic);
                    this.totWhiteMark += parseInt(res[i].WhiteMark);
                    this.totChromBurning += parseInt(res[i].ChromBurning);
                    this.totDentMarks += parseInt(res[i].DentMarks);
                    this.totJigDamage += parseInt(res[i].JigDamage);
                    this.totHighGloss += parseInt(res[i].HighGloss);
                    this.totLowGloss += parseInt(res[i].LowGloss);
                    this.totshadeVariation += parseInt(res[i].shadeVariation);
                    this.totNickel += parseInt(res[i].Nickel);
                    this.totScratches+= parseInt(res[i].Scratches);
                    this.totRoughness += parseInt(res[i].Roughness);
                    this.totBlister += parseInt(res[i].Blister);
                    this.totBlackSpot += parseInt(res[i].BlackSpot);
                    this.totsatinMark += parseInt(res[i].satinMark);
                    this.totTouchBurning += parseInt(res[i].TouchBurning);
                    this.totChemicalMark += parseInt(res[i].ChemicalMark);
                    this.totWaterMark += parseInt(res[i].WaterMark);
                    this.totOther += parseInt(res[i].Other);
                    this.totPatchMark += parseInt(res[i].PatchMark);
                    this.totCopperBurning += parseInt(res[i].CopperBurning);
                    this.totProMouRej += parseInt(res[i].ProMouRej);
                    this.totHandMouRej += parseInt(res[i].HandMouRej);
                    this.totSilverMark += parseInt(res[i].SilverMark);
                    this.totWarPage += parseInt(res[i].WarPage);

                    this.avgOkQty = Math.round((this.totOkQty)/( this.totTotalInsp ) * 100);
                    this.avgHoldQty =  Math.round((this.totHoldQty)/( this.totTotalInsp ) * 100);
                    this.avgRejectedQty = Math.round((this.totRejectedQty)/( this.totTotalInsp ) * 100);
                    this.avgMismatchQty = Math.round((this.totMismatchQty)/( this.totTotalInsp ) * 100);
                    this.avgBufferingQty = Math.round((this.totBufferingQty)/( this.totTotalInsp ) * 100);
                    this.avgPinHole = Math.round((this.totPinHole)/( this.totTotalInsp ) * 100);
                    this.avgPitmarks = Math.round((this.totPitmarks)/( this.totTotalInsp ) * 100);
                    this.avgSkipPlating = Math.round((this.totSkipPlating)/( this.totTotalInsp ) * 100);
                    this.avgDotPlastic = Math.round((this.totDotPlastic)/( this.totTotalInsp ) * 100);
                    this.avgWhiteMark = Math.round((this.totWhiteMark)/( this.totTotalInsp ) * 100);
                    this.avgChromBurning = Math.round((this.totChromBurning)/( this.totTotalInsp ) * 100);
                    this.avgDentMarks = Math.round((this.totDentMarks)/( this.totTotalInsp ) * 100);
                    this.avgJigDamage = Math.round((this.totJigDamage)/( this.totTotalInsp ) * 100);
                    this.avgHighGloss = Math.round((this.totHighGloss)/( this.totTotalInsp ) * 100);
                    this.avgLowGloss = Math.round((this.totLowGloss)/( this.totTotalInsp ) * 100);
                    this.avgshadeVariation = Math.round((this.totshadeVariation)/( this.totTotalInsp ) * 100);
                    this.avgNickel = Math.round((this.totNickel)/( this.totTotalInsp ) * 100);
                    this.avgScratches = Math.round((this.totScratches)/( this.totTotalInsp ) * 100);
                    this.avgRoughness = Math.round((this.totRoughness)/( this.totTotalInsp ) * 100);
                    this.avgBlister = Math.round((this.totBlister)/( this.totTotalInsp ) * 100);
                    this.avgBlackSpot = Math.round((this.totBlackSpot)/( this.totTotalInsp ) * 100);
                    this.avgsatinMark = Math.round((this.totsatinMark)/( this.totTotalInsp ) * 100);
                    this.avgTouchBurning = Math.round((this.totTouchBurning)/( this.totTotalInsp ) * 100);
                    this.avgChemicalMark = Math.round((this.totChemicalMark)/( this.totTotalInsp ) * 100);
                    this.avgWaterMark = Math.round((this.totWaterMark)/( this.totTotalInsp ) * 100);
                    this.avgOther = Math.round((this.totOther)/( this.totTotalInsp ) * 100);
                    this.avgPatchMark = Math.round((this.totPatchMark)/( this.totTotalInsp ) * 100);
                    this.avgCopperBurning = Math.round((this.totCopperBurning)/( this.totTotalInsp ) * 100);
                    this.avgProMouRej = Math.round((this.totProMouRej)/( this.totTotalInsp ) * 100);
                    this.avgHandMouRej = Math.round((this.totHandMouRej)/( this.totTotalInsp ) * 100);
                    this.avgSilverMark = Math.round((this.totSilverMark)/( this.totTotalInsp ) * 100);
                    this.avgWarPage = Math.round((this.totWarPage)/( this.totTotalInsp ) * 100);

     }
}

   ExportToExcel(){
    // if(this.ResponseData.length > 0)
      ETE();
   }

  getBindItems_ByAliasName(){
    this.satinrejectiondetailService.getBindItems_ByAliasName().subscribe(res => {
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