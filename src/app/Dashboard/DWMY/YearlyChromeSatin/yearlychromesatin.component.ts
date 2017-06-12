import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { YearlyService } from '../../../Services/DWMY/yearlychromesatin.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

declare var cvsInspectionYearly: any;
declare var cvsRoundLineYearly: any;
declare var cvsRDefectYearly: any;
declare var cvsTopDefectYearly: any;
declare var pieChartYearly: any;

@Component({
  selector: 'yearly-chrome-satin',
  templateUrl: './yearlychromesatin.component.html',
  styleUrls: ['./yearlychromesatin.component.css'],
  providers: [YearlyService]
})
export class yearlyChromeSatinComponent {
  
    busy: Subscription;
    calledComponent;
    //Responses
    yearlyInspectionResponse;
    yearlyRoundNoResponse;
    yearlyPendingRoundResponse;
    yearlyEmptyRoundResponse;
    yearlyRejectionDefetResponse;
    yearlyTopRejectionDefeteResponse;
    yearlyLegentsResponse;
    yearlyDefetsResponse;

    //Totals
    Idata1 = 0;
    Idata2 = 0;
    Idata3 = 0;
    Idata4 = 0;
    Idata5 = 0;

    Rdata1 = 0;

    Ddata1 = 0;
    Ddata2 = 0;
    Ddata3 = 0;
    Ddata4 = 0;
    Ddata5 = 0;

  constructor(private router: Router, private yearlyService: YearlyService){}

  ngOnInit(){ 

    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/DWMY/yearlychromesatin.component.js';

    if(this.router.url === '/Dashboard/Chrome/Yearly')
        this.calledComponent = 'Chrome';
    else
        this.calledComponent = 'Satin';

    this.YearlyInspection();
    this.YearlyRoundNo();
    this.YearlyTopRejectionDefect();
    this.YearlyDefects();
    this.YearlyRejectionDefet();

    } 

    YearlyInspection(){
    this.busy = this.yearlyService.GetYearlyInspection(this.calledComponent).subscribe(res => {
        this.yearlyInspectionResponse = JSON.parse(res);
        this.ChartBindYearlyInspection(this.yearlyInspectionResponse);
    })
  }

  ChartBindYearlyInspection(res){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var d5=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data1);
        d2.push(res[i].Data2);
        d3.push(res[i].Data3);
        d4.push(res[i].Data4);
        d5.push(res[i].Data5);

        this.Idata1 += res[i].Data1;
        this.Idata2 += res[i].Data2;
        this.Idata3 += res[i].Data3;
        this.Idata4 += res[i].Data4; 
    }

        this.Idata5 = this.Idata1 / this.Idata4;
  cvsInspectionYearly(lables, d1, d2, d3, d4, d5);
}

  YearlyRoundNo(){
    this.busy = this.yearlyService.GetYearlyRoundNo(this.calledComponent).subscribe(res => {
        this.yearlyRoundNoResponse = JSON.parse(res);
        this.yearlyService.GetYearlyPending(this.calledComponent).subscribe(response => {
            this.yearlyPendingRoundResponse = JSON.parse(response);
            this.yearlyService.GetYearlyEmptyRound(this.calledComponent).subscribe(response1 => {
                this.yearlyEmptyRoundResponse = JSON.parse(response1);
                this.ChartBindYearlyRoundNo(this.yearlyRoundNoResponse, this.yearlyPendingRoundResponse, this.yearlyEmptyRoundResponse);
            });
        });
    });
  }

  ChartBindYearlyRoundNo(res, pdata, edata){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(pdata[i].Data);
        d3.push(edata[i].Data);

        this.Rdata1 += res[i].Data;
    }
  cvsRoundLineYearly(lables, d1, d2, d3);
  }

  YearlyRejectionDefet(){
    this.busy = this.yearlyService.GetYearlyRejectionDefects(this.calledComponent).subscribe(res => {
        this.yearlyRejectionDefetResponse = JSON.parse(res);
        this.ChartBindYearlyRejectionDefet(this.yearlyRejectionDefetResponse);
    })
  }

  ChartBindYearlyRejectionDefet(res){
    var lables = [];var d1 = [];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
    }
  cvsRDefectYearly(lables, d1);
}

YearlyTopRejectionDefect(){
    this.busy = this.yearlyService.GetYearTopRejectionDefect(this.calledComponent).subscribe(res => {
        this.yearlyTopRejectionDefeteResponse = JSON.parse(res);
        this.yearlyService.GetLegents(this.calledComponent, 'Yearly').subscribe(response => {
            this.yearlyLegentsResponse = JSON.parse(response);
            this.ChartBindYearlyTopRejectionDefect(this.yearlyTopRejectionDefeteResponse, this.yearlyLegentsResponse);
        });    
    })
  }

  ChartBindYearlyTopRejectionDefect(res, legents){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var d4=[];var d5=[];var i;
    var l1 = [];var l2 = [];var l3 = [];var l4 = [];var l5 = [];
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data1);
        d2.push(res[i].Data2);
        d3.push(res[i].Data3);
        d4.push(res[i].Data4);
        d5.push(res[i].Data5);

    }
    l1.push(legents[0].Legents1);
    l2.push(legents[0].Legents2);
    l3.push(legents[0].Legents3);
    l4.push(legents[0].Legents4);
    l5.push(legents[0].Legents5);
  cvsTopDefectYearly(lables, d1, d2, d3, d4, d5, l1, l2, l3, l4, l5);
}

YearlyDefects(){
    this.busy = this.yearlyService.GetYearlyDefects(this.calledComponent).subscribe(res => {
        this.yearlyDefetsResponse = JSON.parse(res);
        this.ChartBindYearlyDefects(this.yearlyDefetsResponse);
    })
  }

  ChartBindYearlyDefects(res){
    var lables = [];var d1 = [];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
    }
    this.Ddata1 += res[0].Data;
    this.Ddata2 += res[1].Data;
    this.Ddata3 += res[2].Data;
    this.Ddata4 += res[3].Data;
    this.Ddata5 += res[4].Data;

  pieChartYearly(lables, d1);
}
}