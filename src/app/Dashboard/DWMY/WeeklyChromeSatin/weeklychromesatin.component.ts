import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeeklyService } from '../../../Services/DWMY/weeklychromesatin.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

declare var cvsInspectionWeekly: any;
declare var cvsRoundLineWeekly: any;
declare var cvsRDefectWeekly: any;
declare var cvsTopDefectWeekly: any;
declare var pieChartWeekly: any;

@Component({
  selector: 'weekly-chrome-satin',
  templateUrl: './weeklychromesatin.component.html',
  providers: [WeeklyService]
})
export class WeeklyChromeSatinComponent {
  
    busy: Subscription;
    calledComponent;
    //Responses
    weeklyInspectionResponse;
    weeklyRoundNoResponse;
    weeklyPendingRoundResponse;
    weeklyEmptyRoundResponse;
    weeklyRejectionDefetResponse;
    weeklyTopRejectionDefeteResponse;
    weeklyLegentsResponse;
    weeklyDefetsResponse;

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

  constructor(private router: Router, private weeklyService: WeeklyService){}

  ngOnInit(){ 
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/plugins/chartjs/Chart.min.js';


    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/DWMY/weeklychromesatin.component.js';

    if(this.router.url === '/Dashboard/Chrome/Weekly')
        this.calledComponent = 'Chrome';
    else
        this.calledComponent = 'Satin';

    // this.WeeklyInspection();
    // this.WeeklyRoundNo();
    // this.WeeklyTopRejectionDefect();
    // this.WeeklyDefects();
    // this.WeeklyRejectionDefect();

    } 

    ngAfterViewInit(){
        this.WeeklyInspection();
        this.WeeklyRoundNo();
        this.WeeklyTopRejectionDefect();
        this.WeeklyDefects();
        this.WeeklyRejectionDefect();
    }

    WeeklyInspection(){
    this.busy = this.weeklyService.GetWeeklyInspection(this.calledComponent).subscribe(res => {
        this.weeklyInspectionResponse = JSON.parse(res);
        this.ChartBindWeeklyInspection(this.weeklyInspectionResponse);
    })
  }

  ChartBindWeeklyInspection(res){
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
  cvsInspectionWeekly(lables, d1, d2, d3, d4, d5);
}

  WeeklyRoundNo(){
    this.busy = this.weeklyService.GetWeeklyRoundNo(this.calledComponent).subscribe(res => {
        this.weeklyRoundNoResponse = JSON.parse(res);
        this.weeklyService.GetWeeklyPending(this.calledComponent).subscribe(response => {
            this.weeklyPendingRoundResponse = JSON.parse(response);
            this.weeklyService.GetWeeklyEmptyRound(this.calledComponent).subscribe(response1 => {
                this.weeklyEmptyRoundResponse = JSON.parse(response1);
                this.ChartBindWeeklyRoundNo(this.weeklyRoundNoResponse, this.weeklyPendingRoundResponse, this.weeklyEmptyRoundResponse);
            });
        });
    });
  }

  ChartBindWeeklyRoundNo(res, pdata, edata){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(pdata[i].Data);
        d3.push(edata[i].Data);

        this.Rdata1 += res[i].Data;
    }
  cvsRoundLineWeekly(lables, d1, d2, d3);
  }

  WeeklyRejectionDefect(){
    this.busy = this.weeklyService.GetWeeklyRejectionDefects(this.calledComponent).subscribe(res => {
        this.weeklyRejectionDefetResponse = JSON.parse(res);
        this.ChartBindWeeklyRejectionDefect(this.weeklyRejectionDefetResponse);
    })
  }

  ChartBindWeeklyRejectionDefect(res){
    var lables = [];var d1 = [];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
    }
  cvsRDefectWeekly(lables, d1);
}

WeeklyTopRejectionDefect(){
    this.busy = this.weeklyService.GetWeeklyTopRejectionDefect(this.calledComponent).subscribe(res => {
        this.weeklyTopRejectionDefeteResponse = JSON.parse(res);
        this.weeklyService.GetLegents(this.calledComponent, 'Weekly').subscribe(response => {
            this.weeklyLegentsResponse = JSON.parse(response);
            this.ChartBindWeeklyTopRejectionDefect(this.weeklyTopRejectionDefeteResponse, this.weeklyLegentsResponse);
        });    
    })
  }

  ChartBindWeeklyTopRejectionDefect(res, legents){
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

  cvsTopDefectWeekly(lables, d1, d2, d3, d4, d5, l1, l2, l3, l4, l5);
}

WeeklyDefects(){
    this.busy = this.weeklyService.GetWeeklyDefects(this.calledComponent).subscribe(res => {
        this.weeklyDefetsResponse = JSON.parse(res);
        this.ChartBindWeeklyDefects(this.weeklyDefetsResponse);
    })
  }

  ChartBindWeeklyDefects(res){
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

  pieChartWeekly(lables, d1);
}
}