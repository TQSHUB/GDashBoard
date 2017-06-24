import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { ChromeRejectionReviewService } from '../../../Services/Chrome/chromerejectionreview.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

@Component({
    selector: 'chromerejectionreview',
    templateUrl: './chromerejectionreview.component.html',
    providers: [ChromeRejectionReviewService, DatePipe]
})

export class ChromeRejectionReviewComponent{
    busy: Subscription;
    ResponseData;

    DisplayDate;
    Alias_Names;
    Selected_Alias_Names;

    Alldata;
    //ddlinetype;

    constructor(private router: Router, private http: Http, private chromerejectionreviewservice: ChromeRejectionReviewService, private datepipe: DatePipe){}

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/Chrome/chromerejectionreview.component.js';

        this.getBindItems_ByAliasName();
        this.Search();
    }

    getBindItems_ByAliasName()
    {
        this.Selected_Alias_Names = $("#Alias_Names").val();

        var alias_string = this.Selected_Alias_Names;
        var DisplayDate = $("input[name=Date]").val();
        var linetype = $("#LineType").val();

        this.chromerejectionreviewservice.getBindItems_ByAliasName(DisplayDate, linetype, alias_string)
        .subscribe(res => {
            this.Alias_Names = JSON.parse(res.Data);
            //console.log(this.Alias_Names);
        });
    }

    bindalldata()
    {
        this.Selected_Alias_Names = $("#Alias_Names").val();

        var alias_string = this.Selected_Alias_Names;
        var DisplayDate = $("input[name=Date]").val();

        this.chromerejectionreviewservice.bindalldata(DisplayDate, alias_string)
            .subscribe(res => {
                this.Alldata = JSON.parse(res.Data);
                console.log(this.Alldata);
            });
    }

    Search()
    {
        //Get For Values
        this.Selected_Alias_Names = $("#Alias_Names").val();

        var alias_string = this.Selected_Alias_Names;
        var linetype = $("#LineType").val();

        var DisplayDate = $("input[name=Date]").val();

        this.busy = this.chromerejectionreviewservice.search(DisplayDate, linetype, alias_string)
            .subscribe(res => {
                this.ResponseData = JSON.parse(res.Data);
                //console.log(this.ResponseData);
            });
    }

    /*inStringBuilder(a: any)
    {
        var i;
        var stringBuilder = '';
        for(i=0; i < a.length; i++)
        {
        if(i == a.length -1)
            stringBuilder = stringBuilder + '\'' + a[i] + '\'';
        else
            stringBuilder = stringBuilder + '\'' + a[i] + '\',';
        }
        return stringBuilder;
    }*/
}