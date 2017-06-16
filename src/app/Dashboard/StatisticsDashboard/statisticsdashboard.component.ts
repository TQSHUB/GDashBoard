import { Component } from '@angular/core';
import { StatisticsDashboardService } from '../../Services/StatisticsDashboard/statisticsdashboard.service';
import { JsonDate } from '../../Pipes/jsondate.pipe';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'statistics-dashboard',
  templateUrl: './statisticsdashboard.component.html',
  providers: [StatisticsDashboardService, JsonDate, DatePipe]
})

export class StatisticsDashboardComponent {
  busy: Subscription;
  PPCResponse;
  JiggResponse;
  dailyInspectionResponseChrome;
  dailyInspectionResponseSatin;

  ppcTotalPlan = 0;
  ppcActualJigg = 0;
  ppcTotalRndAgstJigg = 0;

  ActualRoundJigged = 0;
  TotalRoundsagnstPrdn = 0;
  TotalRoundsagnstPrdnwithjigg = 0;
  TotalRoundsagnstPrdnwithoutjigg = 0;

  ChromeIdata1 = 0;
  ChromeIdata2 = 0;
  ChromeIdata3 = 0;
  ChromeIdata4 = 0;

  SatinIdata1 = 0;
  SatinIdata2 = 0;
  SatinIdata3 = 0;
  SatinIdata4 = 0;


  constructor(private statisticsDashboardService: StatisticsDashboardService, private jsondate: JsonDate, private datepipe: DatePipe){}

  ngOnInit(){  
      this.getPPCReport(); 
      this.getJiggReport();
      this.dailyInspectionChrome();
      this.dailyInspectionSatin();
  }

  getPPCReport(){
    var from = this.datepipe.transform(Date.now(), 'dd/MM/yyyy');
    var to = this.datepipe.transform(Date.now(), 'dd/MM/yyyy'); 
    this.busy = this.statisticsDashboardService.getPPCDaily(from.toString(), to.toString()).subscribe(res => {
        this.PPCResponse = JSON.parse(res);
        this.PPCTotal(this.PPCResponse);
    })
  }

  PPCTotal(res){
    var i = 0;
    this.ppcTotalPlan = 0;
    this.ppcActualJigg = 0;
    this.ppcTotalRndAgstJigg = 0;
    for(i = 0; i < res.length; i++)
    {
      this.ppcTotalPlan += (res[i]['Plan A'] + res[i]['Plan B'] + res[i]['Plan C']);
      this.ppcActualJigg += parseInt(res[i]['Actual Round Jigged']);
      this.ppcTotalRndAgstJigg += parseInt(res[i]['Total Rounds agnst Prdn']);
    }
  }

  getJiggReport(){
    var from = this.datepipe.transform(Date.now(), 'dd/MM/yyyy');
    var to = this.datepipe.transform(Date.now(), 'dd/MM/yyyy'); 
    this.busy = this.statisticsDashboardService.getJiggDaily(from.toString(), to.toString()).subscribe(res => {
        this.JiggResponse = JSON.parse(res);
        console.log(this.JiggResponse);
        //this.PPCTotal(this.PPCResponse);
    })
  }

  JiggTotal(res){
    var i = 0;
    if(res.length != 0)
    {
      this.ActualRoundJigged = 0;
      this.TotalRoundsagnstPrdn = 0;
      this.TotalRoundsagnstPrdnwithjigg = 0;
      this.TotalRoundsagnstPrdnwithoutjigg = 0;
      for(i = 0; i < res.length; i++)
      {
        this.ActualRoundJigged += parseInt(res[i]['Actual Round Jigged']);
        this.TotalRoundsagnstPrdn += parseInt(res[i]['Total Rounds agnst Prdn']);
        this.TotalRoundsagnstPrdnwithjigg += parseInt(res[i]['Total Rounds agnst Prdn with jigg']);
        this.TotalRoundsagnstPrdnwithoutjigg += parseInt(res[i]['Total Rounds agnst Prdn without jigg']);
      }
    }
  }

  dailyInspectionChrome(){
    this.busy = this.statisticsDashboardService.GetDailyInspection('Chrome').subscribe(res => {
        this.dailyInspectionResponseChrome = JSON.parse(res);
        this.TotalDailyInspectionChrome(this.dailyInspectionResponseChrome);
    })
  }

  TotalDailyInspectionChrome(res){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var d5=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data1);
        d2.push(res[i].Data2);
        d3.push(res[i].Data3);
        d4.push(res[i].Data4);
        d5.push(res[i].Data5);

        this.ChromeIdata1 += res[i].Data1;
        this.ChromeIdata2 += res[i].Data2;
        this.ChromeIdata3 += res[i].Data3;
        this.ChromeIdata4 += res[i].Data4;
    }
  }

  dailyInspectionSatin(){
    this.busy = this.statisticsDashboardService.GetDailyInspection('Satin').subscribe(res => {
        this.dailyInspectionResponseSatin = JSON.parse(res);
        this.TotalDailyInspectionSatin(this.dailyInspectionResponseSatin);
    })
  }

  TotalDailyInspectionSatin(res){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var d5=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data1);
        d2.push(res[i].Data2);
        d3.push(res[i].Data3);
        d4.push(res[i].Data4);
        d5.push(res[i].Data5);

        this.SatinIdata1 += res[i].Data1;
        this.SatinIdata2 += res[i].Data2;
        this.SatinIdata3 += res[i].Data3;
        this.SatinIdata4 += res[i].Data4;
    }
  }
}
