import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DailyService } from '../../../Services/DWMY/dailychromesatin.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

declare var cvsInspectionDaily: any;
declare var cvsRoundLineDaily: any;
declare var cvsRDefectDaily: any;
declare var cvsTopDefectDaily: any;
declare var pieChartDaily: any;

@Component({
  selector: 'daily-chrome-satin',
  templateUrl: './dailychromesatin.component.html',
  providers: [DailyService]
})
export class DailyChromeSatinComponent {
  
    busy: Subscription;
    calledComponent;
    //Responses
    dailyInspectionResponse;
    dailyRoundNoResponse;
    dailyPendingRoundResponse;
    dailyEmptyRoundResponse;
    dailyRejectionDefetResponse;
    dailyTopRejectionDefeteResponse;
    dailyLegentsResponse;
    dailyDefetsResponse;

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

  constructor(private router: Router, private dailyService: DailyService){}

  ngOnInit(){ 

    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/DWMY/dailychromesatin.component.js';

    if(this.router.url === '/Dashboard/Chrome/Daily')
        this.calledComponent = 'Chrome';
    else
        this.calledComponent = 'Satin';

    this.dailyInspection();
    this.dailyRoundNo();
    this.dailyRejectionDefect();
    this.dailyTopRejectionDefect();
    this.dailyDefects();
} 

  dailyInspection(){
    this.busy = this.dailyService.GetDailyInspection(this.calledComponent).subscribe(res => {
        this.dailyInspectionResponse = JSON.parse(res);
        this.ChartBindDailyInspection(this.dailyInspectionResponse);
    })
  }

  ChartBindDailyInspection(res){
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
  cvsInspectionDaily(lables, d1, d2, d3, d4, d5);
}

  dailyRoundNo(){
    this.busy = this.dailyService.GetDailyRoundNo(this.calledComponent).subscribe(res => {
        this.dailyRoundNoResponse = JSON.parse(res);
        this.dailyService.GetDailyPending(this.calledComponent).subscribe(response => {
            this.dailyPendingRoundResponse = JSON.parse(response);
            this.dailyService.GetDailyEmptyRound(this.calledComponent).subscribe(response1 => {
                this.dailyEmptyRoundResponse = JSON.parse(response1);
                this.ChartBindDailyRoundNo(this.dailyRoundNoResponse, this.dailyPendingRoundResponse, this.dailyEmptyRoundResponse);
            });
        });
    });
  }

  ChartBindDailyRoundNo(res, pdata, edata){
    var lables = [];var d1 = [];var d2 =[];var d3=[];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
        d2.push(pdata[i].Data);
        d3.push(edata[i].Data);

        this.Rdata1 += res[i].Data;
    }
  cvsRoundLineDaily(lables, d1, d2, d3);
  }

  dailyRejectionDefect(){
    this.busy = this.dailyService.GetDailyRejectionDefect(this.calledComponent).subscribe(res => {
        this.dailyRejectionDefetResponse = JSON.parse(res);
        this.ChartBindDailyRejectionDefect(this.dailyRejectionDefetResponse);
    })
  }

  ChartBindDailyRejectionDefect(res){
    var lables = [];var d1 = [];var i;
    for(i =0; i< res.length; i++){
        lables.push(res[i].Labels);
        d1.push(res[i].Data);
    }
  cvsRDefectDaily(lables, d1);
}

dailyTopRejectionDefect(){
    this.busy = this.dailyService.GetDailyTopRejectionDefect(this.calledComponent).subscribe(res => {
        this.dailyTopRejectionDefeteResponse = JSON.parse(res);
        this.dailyService.GetLegents(this.calledComponent, 'Daily').subscribe(response => {
            this.dailyLegentsResponse = JSON.parse(response);
            this.ChartBindDailyTopRejectionDefect(this.dailyTopRejectionDefeteResponse, this.dailyLegentsResponse);
        });    
    })
  }

  ChartBindDailyTopRejectionDefect(res, legents){
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
    
  cvsTopDefectDaily(lables, d1, d2, d3, d4, d5, l1, l2, l3, l4, l5);
}

dailyDefects(){
    this.busy = this.dailyService.GetDailyDefects(this.calledComponent).subscribe(res => {
        this.dailyDefetsResponse = JSON.parse(res);
        this.ChartBindDailyDefects(this.dailyDefetsResponse);
    })
  }

  ChartBindDailyDefects(res){
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

  pieChartDaily(lables, d1);
}

}
