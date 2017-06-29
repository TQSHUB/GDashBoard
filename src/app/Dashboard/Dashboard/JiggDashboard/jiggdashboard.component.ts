import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { JiggDashboardService } from '../../../Services/Dashboard/jiggdashboard.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var Canvasjigg: any;
declare var cvsrvsr: any;
declare var cvsRJigg: any;
declare var cvsRJigg2: any;
declare var cvsjigguse: any;

@Component({
  selector: 'jigg-dashboard',
  templateUrl: './jiggdashboard.component.html',
  providers: [DatePipe, JiggDashboardService, CurrencyPipe]
})
export class JiggDashboardComponent {

    busy: Subscription;

    JiggMfgResponse;
    MonthlyMfgDesRes;
    MonthlyMfgRepRes;
    MonthlyMfgScrRes;
    MonthlyMfgRecRes;

    JiggVsChromeRes;
    JiggVsSatinRes;

    Top20Jigg;

    //Totals
    TotalJiggNew = 0;
    TotalJiggDesign = 0;
    TotalJiggScrap = 0;
    TotalJiggRepair = 0;
    TotalJiggRectify = 0;
    TotalJiggRoundChrome = 0;
    TotalJiggRoundSatin = 0;
    TotalSatinRound = 0;
    TotalChromeRound = 0;

    constructor(private http: Http,private jiggDashboardService: JiggDashboardService, private datepipe: DatePipe){}

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/plugins/Chart_new.js/Chart.bundle.js';

        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/ComponentJs/Dashboard/jiggdashboard.component.js';

        // this.getJiggMfgChart();
        // this.getJiggMfgRRChart();
        // this.getMonthlyRoundJiggVsChrome();
        // this.getMonthlyRoundJiggVsSatin();
        // this.getTop20Jigg();
    }

    ngAfterViewInit(){
        this.getJiggMfgChart();
        this.getJiggMfgRRChart();
        this.getMonthlyRoundJiggVsChrome();
        this.getMonthlyRoundJiggVsSatin();
        this.getTop20Jigg();
    }

    refreshgetJiggMfgChart(){
      this.getJiggMfgChart();
    }
    refreshgetJiggMfgRRChart(){
      this.getJiggMfgRRChart();
    }
     refreshgetMonthlyRoundJiggVsChrome(){
      this.getMonthlyRoundJiggVsChrome();
    }
    refreshgetMonthlyRoundJiggVsSatin(){
      this.getMonthlyRoundJiggVsSatin();
    }
    refreshgetTop20Jigg(){
      this.getTop20Jigg();
    }


  //Chart 1

  getJiggMfgChart(){
    this.busy = this.jiggDashboardService.getMonthlyMfgRepair().subscribe(res => {
        this.MonthlyMfgRepRes = JSON.parse(res);
        this.jiggDashboardService.getMonthlyMfgScrape().subscribe(res => {
            this.MonthlyMfgScrRes = JSON.parse(res);
              this.jiggDashboardService.getMonthlyMfgNew().subscribe(res => {
              this.JiggMfgResponse = JSON.parse(res);
                this.jiggDashboardService.getMonthlyMfgDesign().subscribe(res => {
                  this.MonthlyMfgDesRes = JSON.parse(res);
                    this.JiggMfg(this.JiggMfgResponse, this.MonthlyMfgDesRes, this.MonthlyMfgRepRes, this.MonthlyMfgScrRes);
                });
            });
        });
    });
  }

  JiggMfg(res, MDesres, MRepres, MScrRes){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var i;
        this.TotalJiggNew = 0;
        this.TotalJiggDesign = 0;
        this.TotalJiggRepair = 0;
        this.TotalJiggScrap = 0;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(MDesres[i].Data);
        d3.push(MRepres[i].Data);
        d4.push(MScrRes[i].Data);

        this.TotalJiggNew += res[i].Data;
        this.TotalJiggDesign += MDesres[i].Data;
        this.TotalJiggRepair += MRepres[i].Data;
        this.TotalJiggScrap += MScrRes[i].Data;
    }
    Canvasjigg(lables, d1, d2, d3, d4);
  }

//Chart 2

  getJiggMfgRRChart(){
    this.busy = this.jiggDashboardService.getMonthlyMfgNew().subscribe(res => {
      this.JiggMfgResponse = JSON.parse(res);
      this.jiggDashboardService.getMonthlyMfgRectify().subscribe(res => {
        this.MonthlyMfgRecRes = JSON.parse(res);
          this.JiggMfgRR(this.JiggMfgResponse, this.MonthlyMfgRecRes);
      });
    });
  }

  JiggMfgRR(res, MRecres){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var i;
     this.TotalJiggRectify = 0;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(MRecres[i].Data);

        this.TotalJiggRectify += MRecres[i].Data;
    }
    cvsrvsr(lables, d1, d2);
  }

//Chart 3

  getMonthlyRoundJiggVsChrome(){
    var MonthlyRoundNoJigg;
    this.busy = this.jiggDashboardService.getMonthlyJiggRoundChrome().subscribe(res => {
      this.JiggVsChromeRes = JSON.parse(res);
      this.jiggDashboardService.getMonthlyRoundNoJigg('Chrome').subscribe(res => {
          MonthlyRoundNoJigg = JSON.parse(res);
          this.MJiggVsChrome(this.JiggVsChromeRes, MonthlyRoundNoJigg);
      });
    });
  }

  MJiggVsChrome(res, MRJiggres){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var i;
        this.TotalJiggRoundChrome = 0;
        this.TotalChromeRound = 0;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(MRJiggres[i].Data);

        this.TotalJiggRoundChrome += res[i].Data;
        this.TotalChromeRound += MRJiggres[i].Data;
    }
    cvsRJigg(lables, d1, d2);
  }

//Chart 4

  getMonthlyRoundJiggVsSatin(){
    var MonthlyRoundNoJigg;
    this.busy = this.jiggDashboardService.getMonthlyJiggRoundSatin().subscribe(res => {
      this.JiggVsSatinRes = JSON.parse(res);
      this.jiggDashboardService.getMonthlyRoundNoJigg('Satin').subscribe(res => {
          MonthlyRoundNoJigg = JSON.parse(res);
          this.MJiggVsSatin(this.JiggVsSatinRes, MonthlyRoundNoJigg);
      });
    });
  }

  MJiggVsSatin(res, MRJiggres){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var i;
    this.TotalJiggRoundSatin = 0;
     this.TotalSatinRound = 0;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(MRJiggres[i].Data);

        this.TotalJiggRoundSatin += res[i].Data;
        this.TotalSatinRound += MRJiggres[i].Data;
    }
    cvsRJigg2(lables, d1, d2);
  }

  //Chart 5
  getTop20Jigg(){
    var MonthlyRoundNoJigg;
    this.busy = this.jiggDashboardService.getTop10Jigg().subscribe(res => {
      this.Top20Jigg = JSON.parse(res);
      this.Top20JiggChart(this.Top20Jigg);
    });
  }

  Top20JiggChart(res){
    var lables = [];var d1 = [];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
    }
    cvsjigguse(lables, d1);
  }

}