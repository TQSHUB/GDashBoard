import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CSDashboardService } from '../../../Services/Dashboard/csdashboard.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var cvsChromeInspection: any;
declare var cvsChromeMonthly: any;
declare var cvsSatinInspection: any;
declare var cvsMonthlySatin: any;

@Component({
  selector: 'cs-dashboard',
  templateUrl: './csdashboard.component.html',
  providers: [DatePipe, CSDashboardService, CurrencyPipe]
})
export class CSDashboardComponent {
  busy: Subscription;
  //Chrome
  ChromeInspectionResponse;
  TotalInspectionChrome = 0;
  OkValueChrome = 0;
  HoldValueChrome = 0;
  RejectionValueChrome = 0;
  RejectionValuePerChrome = 0;

  ChromeMonthlyResponse;
  ChromePendingResponse;
  ChromeEmptyResponse;
  InspPendingRoundChrome = 0;
  ProducedRoundChrome = 0;
  EmptyRoundChrome = 0;
  AggregateRoundChrome = 0;

  //Satine
  SatinInspectionResponse;
  TotalInspectionSatin = 0;
  OkValueSatin = 0;
  HoldValueSatin = 0;
  RejectionValueSatin = 0;
  RejectionValuePerSatin = 0;

  SatinMonthlyResponse;
  SatinPendingResponse;
  SatinEmptyResponse;
  InspPendingRoundSatin = 0;
  ProducedRoundSatin = 0;
  EmptyRoundSatin = 0;
  AggregateRoundSatin = 0;

  constructor(private http: Http,private csDashboardService: CSDashboardService, private datepipe: DatePipe){}

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../assets/plugins/Chart_new.js/Chart.bundle.js';

    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../assets/ComponentJs/Dashboard/csdashboard.component.js';

      // this.getMonthlyInspectionChrome();
      // this.getMonthlyRoundNoChrome();
      // this.getMonthlyInspectionSatine();
      // this.getMonthlyRoundNoSatine();
  }

  ngAfterViewInit(){
      this.getMonthlyInspectionChrome();
      this.getMonthlyRoundNoChrome();
      this.getMonthlyInspectionSatine();
      this.getMonthlyRoundNoSatine();
  }

  //Chrome Inspection
  getMonthlyInspectionChrome(){
      this.busy = this.csDashboardService.getMonthlyInspection('Chrome').subscribe(res => {
        this.ChromeInspectionResponse = JSON.parse(res);
        this.ChartBindCMI(this.ChromeInspectionResponse);
      });
  }

  ChartBindCMI(res){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var d5=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data1);
        d2.push(res[i].Data2);
        d3.push(res[i].Data3);
        d4.push(res[i].Data4);
        d5.push(res[i].Data5);

        //Chrome
        this.TotalInspectionChrome += res[i].Data1;
        this.OkValueChrome += res[i].Data2;
        this.HoldValueChrome += res[i].Data3;
        this.RejectionValueChrome += res[i].Data4;

        if(this.TotalInspectionChrome == 0 && this.RejectionValueChrome == 0)
          this.RejectionValuePerChrome = 0;
        else
          this.RejectionValuePerChrome = this.RejectionValueChrome / this.TotalInspectionChrome * 100;
    }
    cvsChromeInspection(lables,d1,d2,d3,d4,d5);
  }

  //Chrome Monthly
  getMonthlyRoundNoChrome(){
    this.busy = this.csDashboardService.getMonthlyRoundNo('Chrome').subscribe(res => {
      this.ChromeMonthlyResponse = JSON.parse(res);
      this.csDashboardService.GetMonthlyPending('Chrome').subscribe(res => {
        this.ChromePendingResponse = JSON.parse(res);
        this.csDashboardService.GetMonthlyEmptyRound('Chrome').subscribe(res => {
          this.ChromeEmptyResponse = JSON.parse(res);
          this.ChartBindCMR(this.ChromeMonthlyResponse, this.ChromePendingResponse, this.ChromeEmptyResponse)
        });
      });
    });
  }

  ChartBindCMR(res, pendingres, emptyres){
    var lables = [];var d1 = [];var d2 = [];var d3 = [];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(pendingres[i].Data);
        d3.push(emptyres[i].Data);

        //Chrome
        this.ProducedRoundChrome += res[i].Data;
        this.EmptyRoundChrome += emptyres[i].Data;
        this.AggregateRoundChrome = this.ProducedRoundChrome + this.EmptyRoundChrome;
    }
    this.csDashboardService.LoadingChromeData().subscribe(res => this.InspPendingRoundChrome = res);
    cvsChromeMonthly(lables,d1,d2,d3);
  }

  //Satine Inspection
  getMonthlyInspectionSatine(){
      this.busy = this.csDashboardService.getMonthlyInspection('Satin').subscribe(res => {
        this.SatinInspectionResponse = JSON.parse(res);
        this.ChartBindSMI(this.SatinInspectionResponse);
      });
  }

  ChartBindSMI(res){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var d5=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data1);
        d2.push(res[i].Data2);
        d3.push(res[i].Data3);
        d4.push(res[i].Data4);
        d5.push(res[i].Data5);

        //Chrome
        this.TotalInspectionSatin += res[i].Data1;
        this.OkValueSatin += res[i].Data2;
        this.HoldValueSatin += res[i].Data3;
        this.RejectionValueSatin += res[i].Data4;

        if(this.TotalInspectionSatin == 0 && this.RejectionValueSatin == 0)
          this.RejectionValuePerSatin = 0;
        else
          this.RejectionValuePerSatin = this.RejectionValueSatin / this.TotalInspectionSatin * 100;
    }
    cvsSatinInspection(lables,d1,d2,d3,d4,d5);
  }

  //Satin Monthly
  getMonthlyRoundNoSatine(){
    this.busy = this.csDashboardService.getMonthlyRoundNo('Satin').subscribe(res => {
      this.SatinMonthlyResponse = JSON.parse(res);
      this.csDashboardService.GetMonthlyPending('Satin').subscribe(res => {
        this.ChromePendingResponse = JSON.parse(res);
        this.csDashboardService.GetMonthlyEmptyRound('Satin').subscribe(res => {
          this.ChromeEmptyResponse = JSON.parse(res);
          this.ChartBindSMR(this.SatinMonthlyResponse, this.ChromePendingResponse, this.ChromeEmptyResponse)
        });
      });
    });
  }

  ChartBindSMR(res, pendingres, emptyres){
    var lables = [];var d1 = [];var d2 = [];var d3 = [];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(pendingres[i].Data);
        d3.push(emptyres[i].Data);

        //Chrome
        this.ProducedRoundSatin += res[i].Data;
        this.EmptyRoundSatin += emptyres[i].Data;
        this.AggregateRoundSatin = this.ProducedRoundSatin + this.EmptyRoundSatin;
    }
    this.csDashboardService.LoadingSatinData().subscribe(res => this.InspPendingRoundSatin = res);
    cvsMonthlySatin(lables,d1,d2,d3);
  }
  
}
