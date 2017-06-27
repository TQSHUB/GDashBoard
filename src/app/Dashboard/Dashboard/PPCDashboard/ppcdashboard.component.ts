import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { PPCDashboardService } from '../../../Services/Dashboard/ppcdashboard.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var ppcMonthlyChrome: any;
declare var ppcMonthlySatin: any;

@Component({
  selector: 'ppc-dashboard',
  templateUrl: './ppcdashboard.component.html',
  providers: [DatePipe, PPCDashboardService, CurrencyPipe]
})
export class PPCDashboardComponent {
    busy: Subscription;

    PPCChromeRes;
    PPCSatinRes;

    //Total's
    TotalRoundChrome = 0;
    TotalRoundJiggChrome = 0;
    TotalShiftRoundChrome = 0;
    TotalRoundSatin = 0;
    TotalRoundJiggSatin = 0;
    TotalShiftRoundSatin = 0;

    constructor(private http: Http,private ppcDashboardService: PPCDashboardService, private datepipe: DatePipe){}

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/plugins/Chart_new.js/Chart.bundle.js';

        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/ComponentJs/Dashboard/ppcdashboard.component.js';

        // this.getMonthlyInspectionChrome();
        // this.getMonthlyInspectionSatin();
    }

    ngAfterViewInit(){
        this.getMonthlyInspectionChrome();
        this.getMonthlyInspectionSatin();
    }


    //PPC Chrome
  getMonthlyInspectionChrome(){
     this.busy = this.ppcDashboardService.getPpcMonthlyChartChrome().subscribe(res => {
        this.PPCChromeRes = JSON.parse(res);
        this.ChartBindChrome(this.PPCChromeRes);
      });
  }

  ChartBindChrome(res){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Total_Round);
        d2.push(res[i].Total);
        d3.push(res[i].Percentage);
        d4.push(res[i].Jigg);

        //Chrome
        this.TotalShiftRoundChrome += res[i].Total;
        this.TotalRoundChrome += res[i].Total_Round;
        this.TotalRoundJiggChrome += res[i].Jigg; 
    }
    ppcMonthlyChrome(lables,d1,d2,d3,d4);
  }

  //Satin

  getMonthlyInspectionSatin(){
      this.busy = this.ppcDashboardService.getPpcMonthlyChartSatin().subscribe(res => {
        this.PPCSatinRes = JSON.parse(res);
        this.ChartBindSatin(this.PPCSatinRes);
      });
  }

  ChartBindSatin(res){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Total_Round);
        d2.push(res[i].Total);
        d3.push(res[i].Percentage);
        d4.push(res[i].Jigg);

        //Satin
        this.TotalShiftRoundSatin += res[i].Total;
        this.TotalRoundSatin += res[i].Total_Round;
        this.TotalRoundJiggSatin += res[i].Jigg;
    }
    ppcMonthlySatin(lables,d1,d2,d3,d4);
  }


}