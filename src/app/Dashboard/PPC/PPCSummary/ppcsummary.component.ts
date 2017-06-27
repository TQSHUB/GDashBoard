import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { SearchPipePPCSummary } from './searchtable.pipe';
import { PPCSummaryService } from '../../../Services/PPC/ppcsummary.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

declare var ETE: any;

@Component({
  selector: 'ppc-summary',
  templateUrl: './ppcsummary.component.html',
  providers: [PPCSummaryService, DatePipe, SearchPipePPCSummary],
  styleUrls: ['./ppcsummary.component.css']
})
export class PPCSummaryComponent {
  busy: Subscription;
  ResponseData;
  ResponseDataCopy;
  TopHeader;
  SubHeader;
  ActualColumn;
  Alias_Name;
  searchText;

  constructor(private http: Http, private router: Router,private ppcSummaryService: PPCSummaryService, private datepipe: DatePipe, private searchPipe: SearchPipePPCSummary){}

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = '../../assets/ComponentJs/PPC/ppcsummary.component.js';
  }

  Search(){
      var Month = $("#Month").val();
      var NatureOfComp = $("#NatureOfComp").val();

      this.busy = this.ppcSummaryService.getMonthlySummary(Month,NatureOfComp).subscribe(res => {
          this.ResponseData = JSON.parse(res.Data.JsonData);
          this.ResponseDataCopy =this.ResponseData;
          this.ActualColumn = res.Data.ActualColumn;
          this.TopHeader = res.Data.Headers;
          this.SubHeader = res.Data.SubHeaders;
          this.Alias_Name = 'Alias Name';
      });
  }
  
SearchTextBox(){
    var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
    if(filterData == 'Empty')
      this.ResponseData = this.ResponseDataCopy;
    else
      this.ResponseData = filterData;
  }

  ExportToExcel(){
    ETE();
  }
}
