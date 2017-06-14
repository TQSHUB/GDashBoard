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

  ppcTotalPlan = 0;
  ppcActualJigg = 0;
  ppcTotalRndAgstJigg = 0;

  constructor(private statisticsDashboardService: StatisticsDashboardService, private jsondate: JsonDate, private datepipe: DatePipe){}

  ngOnInit(){  
      this.getPPCReport(); 
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
}
