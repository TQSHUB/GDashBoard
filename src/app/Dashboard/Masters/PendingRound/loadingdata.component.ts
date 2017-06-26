import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common'
import { Loading } from '../../../Services/Masters/loadingdata.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { SearchPipe } from './searchtable.pipe'

@Component({
  selector: 'loadingdatacomponent',
  templateUrl: './loadingdata.component.html',
  providers : [Loading,DatePipe,SearchPipe]
})

export class LoadingData{

    busy: Subscription;
    ResponseData;
    FromDate;
    ToDate;
    ResponseDataCopy;
    searchText;
    constructor(private datepipe: DatePipe,private loadingdataservice: Loading,private searchPipe: SearchPipe){}

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/Masters/loadingdata.component.js';

        this.Search();
    }

    Search(){
          var FromDate = $("input[name=FromDate]").val();
          var ToDate = $("input[name=ToDate]").val();  
          if(FromDate == '' && ToDate == '' )
           { 
               this.FromDate = '';
               this.ToDate = '';
           }
           else
           {
                this.FromDate = this.datepipe.transform(FromDate,"MM/dd/yyyy");
                this.ToDate = this.datepipe.transform(ToDate,"MM/dd/yyyy"); 
           }
          this.busy = this.loadingdataservice.getLoadingData(this.FromDate,this.ToDate).subscribe(res=>{
          this.ResponseData =res.Data;
          this.ResponseDataCopy =res.Data;
          //console.log.log(this.ResponseData)
          //console.log.log(this.FromDate);
          //console.log.log(this.ToDate);
      })
    }

    SearchTextBox(){
    var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
    if(filterData == 'Empty')
      this.ResponseData = this.ResponseDataCopy;
    else
      this.ResponseData = filterData;
  }

 


}