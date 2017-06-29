import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChromeDetailService } from '../../../Services/Chrome/chromedetail.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { SearchPipeCIRQty } from './searchtable.pipe'
import { JsonDate } from '../../../Pipes/jsondate.pipe';
import {GenericTableComponent, GtConfig} from '@angular-generic-table/core';
import * as $ from 'jquery';

declare var ETE: any;

@Component({
    selector: 'Chrome-Detail',
    templateUrl: 'chromedetail.component.html',
    providers: [ChromeDetailService,DatePipe,SearchPipeCIRQty, JsonDate]
})

export class ChromeDetailComponet{
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
  // Total
  totInsp =  0;
  totokqty = 0;
  totholdqty = 0;
  totrejection = 0;
  totmismatch = 0;
  totbuffring = 0;
  totpitting = 0;
  totskipplating = 0 ;
  totnickle = 0;
  totscratchmrk =0;
  totpatchmrk = 0;
  totrough = 0;
  totsilvermrk = 0;
  totcrburn = 0;
  totwarpage = 0;
  totmoulding = 0;
  totdent = 0;
  totother = 0;
  totpinhole = 0;
  totdotplct = 0;
  totcopperbr = 0;
  totwhitemrk = 0;
  totwatermrk = 0;
  totblister = 0;
  totjigdamage = 0;
  tothandmou = 0;
  //Avg
 
  avgokqty = 0; 
  avgholdqty = 0;
  avgrejection = 0;
  avgmismatch = 0;
  avgbuffring = 0;
  avgpitting = 0;
  avgskipplating = 0 ;
  avgnickle = 0;
  avgscratchmrk =0;
  avgpatchmrk = 0;
  avgrough = 0;
  avgsilvermrk = 0;
  avgcrburn = 0;
  avgwarpage = 0;
  avgmoulding = 0;
  avgdent = 0;
  avgother = 0;
  avgpinhole = 0;
  avgdotplct = 0;
  avgcopperbr = 0;
  avgwhitemrk = 0;
  avgwatermrk = 0;
  avgblister = 0;
  avgjigdamage = 0;
  avghandmou = 0;



  constructor(private chromeDetailService: ChromeDetailService, private datepipe: DatePipe, private searchPipe: SearchPipeCIRQty, private jsondate: JsonDate){}

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/Chrome/chromedetail.component.js';

        /*var fromdate = Date.now();
        var date = this.datepipe.transform(fromdate, 'dd/MM/yyyy');
        this.FromDate = date;
        this.ToDate = date;*/



    this.getBindItems_ByAliasName();
    this.search();
 
  }
  
  search()
  {
       
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

     console.log(this.FromDate)
     console.log(this.ToDate)

    //  this.FromDate = this.datepipe.transform(FromDate,"MM/dd/yyyy");
    //  this.ToDate = this.datepipe.transform(ToDate,"MM/dd/yyyy"); 
    

       //console.log(this.FromDate);
      // //console.log(this.ToDate);
      
       this.Selected_Alias_Names = $("#Alias_Names").val();
       var alias_string = this.inStringBuilder(this.Selected_Alias_Names);
        //console.log(this.Alias_Names);

         var Top_string = $("#top").val();
         var loadingshift_string = $("#loadingshift").val();
         var orderby_string = $("#orderby").val();
         var orderbyA_string = $("#orderbyA").val();

         if(Top_string == 'NULL')
            Top_string = '';
         if(loadingshift_string == 'NULL')
            loadingshift_string = '';
         if(orderby_string == 'NULL')
            orderby_string = '';
         if(orderbyA_string == 'NULL')
            orderbyA_string = '';

        this.busy = this.chromeDetailService.getChromeGrid(this.FromDate,this.ToDate, alias_string, Top_string, loadingshift_string, orderby_string,orderbyA_string).subscribe(res => {
        // this.ResponseData = res.Data;
        // this.ResponseDataCopy = res.Data;
     
        // this.TotalData(this.ResponseData);
        // this.Avgdata(this.ResponseData);
         this.json = JSON.parse(res);
         console.log(this.json);
        //  console.log(res);
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
   getBindItems_ByAliasName(){
    this.chromeDetailService.getBindItems_ByAliasName().subscribe(res => {
      this.Alias_Names = res.Data;
    });
  }
   TotalData(res){
    var i;
    this.totInsp = 0;
    this.totokqty = 0;
    this.totholdqty = 0;
    this.totrejection = 0;
  this.totmismatch = 0;
  this.totbuffring = 0;
  this.totpitting = 0;
  this.totskipplating = 0 ;
  this.totnickle = 0;
  this.totscratchmrk =0;
  this.totpatchmrk = 0;
  this.totrough = 0;
  this.totsilvermrk = 0;
  this.totcrburn = 0;
  this.totwarpage = 0;
  this.totmoulding = 0;
  this.totdent = 0;
  this.totother = 0;
  this.totpinhole = 0;
  this.totdotplct = 0;
  this.totcopperbr = 0;
  this.totwhitemrk = 0;
  this.totwatermrk = 0;
  this.totblister = 0;
  this.totjigdamage = 0;
  this.tothandmou = 0;
  
    for(i = 0; i < res.length; i++)
    {
      //this.totInsp += parseInt(res[i].TotalInsp);
        this.totInsp += parseInt(res[i].OkQty) + parseInt(res[i].HoldQty) + parseInt(res[i].RejectedQty) + parseInt(res[i].BufferingQty);
        this.totokqty += parseInt(res[i].OkQty);
        this.totholdqty += parseInt(res[i].HoldQty);
        this.totrejection += parseInt(res[i].RejectedQty);
        this.totmismatch += parseInt(res[i].MismatchQty);
        this.totbuffring += parseInt(res[i].BufferingQty);
        this.totpitting += parseInt(res[i].Pitting);
        this.totskipplating += parseInt(res[i].SkipPlating);
        this.totnickle += parseInt(res[i].NickleShow);
        this.totscratchmrk += parseInt(res[i].ScratchMarks);
        this.totpatchmrk += parseInt(res[i].PatchMark);
        this.totrough += parseInt(res[i].Roughness);
        this.totsilvermrk += parseInt(res[i].SilverMark);
        this.totcrburn += parseInt(res[i].CrBurn);
        this.totwarpage += parseInt(res[i].WarPage);
        this.totmoulding += parseInt(res[i].MouldingRej);
        this.totdent += parseInt(res[i].Dent);
        this.totother += parseInt(res[i].Other);
        this.totpinhole += parseInt(res[i].PinHole);
        this.totdotplct += parseInt(res[i].DotPlastic);
        this.totcopperbr += parseInt(res[i].CopperBurning);
        this.totwhitemrk += parseInt(res[i].WhiteMark);
        this.totwatermrk += parseInt(res[i].WaterMark);
        this.totblister += parseInt(res[i].Blister);
        this.totjigdamage += parseInt(res[i].JigDamage);
        this.tothandmou += parseInt(res[i].HandMouRej);
    }
  }
  Avgdata(res){
    var i;
   
    this.avgokqty = 0; 
    this.avgholdqty = 0;
    this.avgrejection = 0;
    this.avgmismatch = 0;
    this.avgbuffring = 0;
    this.avgpitting = 0;
    this.avgskipplating = 0 ;
    this.avgnickle = 0;
    this.avgscratchmrk =0;
    this.avgpatchmrk = 0;
    this.avgrough = 0;
    this.avgsilvermrk = 0;
    this.avgcrburn = 0;
    this.avgwarpage = 0;
    this.avgmoulding = 0;
    this.avgdent = 0;
    this.avgother = 0;
    this.avgpinhole = 0;
    this.avgdotplct = 0;
    this.avgcopperbr = 0;
    this.avgwhitemrk = 0;
    this.avgwatermrk = 0;
    this.avgblister = 0;
    this.avgjigdamage = 0;
    this.avghandmou = 0;   
   
     for(i = 0; i < res.length; i++)
    {
      this.avgokqty = Math.round((this.totokqty)/( this.totInsp ) * 100);
     this.avgholdqty =  Math.round((this.totholdqty)/( this.totInsp ) * 100);
    this.avgrejection = Math.round((this.totrejection)/( this.totInsp ) * 100);
    this.avgmismatch =  Math.round((this.totmismatch)/( this.totInsp ) * 100);
    this.avgbuffring =  Math.round((this.totbuffring)/( this.totInsp ) * 100);
    this.avgpitting =  Math.round((this.totpitting)/( this.totInsp ) * 100);
    this.avgskipplating =  Math.round((this.totskipplating)/( this.totInsp ) * 100);
    this.avgnickle =  Math.round((this.totnickle)/( this.totInsp ) * 100);
    this.avgscratchmrk = Math.round((this.totscratchmrk)/( this.totInsp ) * 100);
    this.avgpatchmrk =  Math.round((this.totpatchmrk)/( this.totInsp ) * 100);
    this.avgrough =  Math.round((this.totrough)/( this.totInsp ) * 100);
    this.avgsilvermrk =  Math.round((this.totsilvermrk)/( this.totInsp ) * 100);
    this.avgcrburn =  Math.round((this.totcrburn)/( this.totInsp ) * 100);
    this.avgwarpage =  Math.round((this.totwarpage)/( this.totInsp ) * 100);
    this.avgmoulding =  Math.round((this.totmoulding)/( this.totInsp ) * 100);
    this.avgdent = Math.round((this.totdent)/( this.totInsp ) * 100);
    this.avgother =  Math.round((this.totother)/( this.totInsp ) * 100);
    this.avgpinhole =  Math.round((this.totpinhole)/( this.totInsp ) * 100);
    this.avgdotplct =  Math.round((this.totdotplct)/( this.totInsp ) * 100);
    this.avgcopperbr = Math.round((this.totcopperbr)/( this.totInsp ) * 100);
    this.avgwhitemrk =  Math.round((this.totwhitemrk)/( this.totInsp ) * 100);
    this.avgwatermrk = Math.round((this.totwatermrk)/( this.totInsp ) * 100);
    this.avgblister = Math.round((this.totblister)/( this.totInsp ) * 100);
    this.avgjigdamage =  Math.round((this.totjigdamage)/( this.totInsp ) * 100);
    this.avghandmou =  Math.round((this.tothandmou)/( this.totInsp ) * 100);


     
    }
  }
   ExportToExcel(){
    // if(this.ResponseData.length > 0)
      ETE();
   }
   SearchTextBox(){
    var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
    if(filterData == 'Empty')
      this.json = this.ResponseDataCopy;
    else
      this.json = filterData;
  }
   
}