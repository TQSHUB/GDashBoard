import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MonthlyService } from '../../../Services/DWMY/monthlychromesatin.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

declare var cvsInspectionMonthly: any;
declare var cvsRoundLineMonthly: any;
declare var cvsRDefectMonthly: any;
declare var cvsTopDefectMonthly: any;
declare var pieChartMonthly: any;

@Component({
  selector: 'monthly-chrome-satin',
  templateUrl: './monthlychromesatin.component.html',
  providers: [MonthlyService]
})
export class MonthlyChromeSatinComponent {
  
    busy: Subscription;
    calledComponent;
    //Responses
    monthlyInspectionResponse;
    monthlyRoundNoResponse;
    monthlyPendingRoundResponse;
    monthlyEmptyRoundResponse;
    monthlyRejectionDefetResponse;
    monthlyTopRejectionDefeteResponse;
    monthlyLegentsResponse;
    monthlyDefetsResponse;

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

  constructor(private router: Router, private monthlyService: MonthlyService){}

  ngOnInit(){ 
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/plugins/chartjs/Chart.min.js';

    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/DWMY/monthlychromesatin.component.js';

    if(this.router.url === '/Dashboard/Chrome/Monthly')
        this.calledComponent = 'Chrome';
    else
        this.calledComponent = 'Satin';

    // this.MonthlyInspection();
    // this.MonthlyRoundNo();
    // this.MonthlyTopRejectionDefect();
    // this.MonthlyDefects();
    // this.MonthlyRejectionDefect();

    } 

    ngAfterViewInit(){
        this.MonthlyInspection();
        this.MonthlyRoundNo();
        this.MonthlyTopRejectionDefect();
        this.MonthlyDefects();
        this.MonthlyRejectionDefect();
    }

    refreshChart(){
        this.MonthlyInspection();
        this.MonthlyRoundNo();
        this.MonthlyTopRejectionDefect();
        this.MonthlyDefects();
        this.MonthlyRejectionDefect();
    }

    MonthlyInspection(){
    this.busy = this.monthlyService.GetMonthlyInspection(this.calledComponent).subscribe(res => {
        this.monthlyInspectionResponse = JSON.parse(res);
        this.ChartBindMonthlyInspection(this.monthlyInspectionResponse);
    });
    }

  ChartBindMonthlyInspection(res){
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
  cvsInspectionMonthly(lables, d1, d2, d3, d4, d5);
}

  MonthlyRoundNo(){
    this.busy = this.monthlyService.GetMonthlyRoundNo(this.calledComponent).subscribe(res => {
        this.monthlyRoundNoResponse = JSON.parse(res);
        this.monthlyService.GetMonthlyPending(this.calledComponent).subscribe(response => {
            this.monthlyPendingRoundResponse = JSON.parse(response);
            this.monthlyService.GetMonthlyEmptyRound(this.calledComponent).subscribe(response1 => {
                this.monthlyEmptyRoundResponse = JSON.parse(response1);
                this.ChartBindMonthlyRoundNo(this.monthlyRoundNoResponse, this.monthlyPendingRoundResponse, this.monthlyEmptyRoundResponse);
            });
        });
    });
  }

  ChartBindMonthlyRoundNo(res, pdata, edata){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(pdata[i].Data);
        d3.push(edata[i].Data);

        this.Rdata1 += res[i].Data;
    }
  cvsRoundLineMonthly(lables, d1, d2, d3);
  }

  MonthlyRejectionDefect(){
    this.busy = this.monthlyService.GetMonthlyRejectionDefects(this.calledComponent).subscribe(res => {
        this.monthlyRejectionDefetResponse = JSON.parse(res);
        this.ChartBindMonthlyRejectionDefect(this.monthlyRejectionDefetResponse);
    })
  }

  ChartBindMonthlyRejectionDefect(res){
    var lables = [];var d1 = [];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
    }
  cvsRDefectMonthly(lables, d1);
}

MonthlyTopRejectionDefect(){
    this.busy = this.monthlyService.GetMonthlyTopRejectionDefect(this.calledComponent).subscribe(res => {
        this.monthlyTopRejectionDefeteResponse = JSON.parse(res);
        this.monthlyService.GetLegents(this.calledComponent, 'Monthly').subscribe(response => {
            this.monthlyLegentsResponse = JSON.parse(response);
            this.ChartBindMonthlyTopRejectionDefect(this.monthlyTopRejectionDefeteResponse, this.monthlyLegentsResponse);
        });    
    })
  }

  ChartBindMonthlyTopRejectionDefect(res, legents){
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
    
  cvsTopDefectMonthly(lables, d1, d2, d3, d4, d5, l1, l2, l3, l4, l5);
}

MonthlyDefects(){
    this.busy = this.monthlyService.GetMonthlyDefects(this.calledComponent).subscribe(res => {
        this.monthlyDefetsResponse = JSON.parse(res);
        this.ChartBindMonthlyDefets(this.monthlyDefetsResponse);
    })
  }

  ChartBindMonthlyDefets(res){
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

  pieChartMonthly(lables, d1);
}
}