import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { host } from '../../../Configurations/application.config';
import * as $ from 'jquery';

@Component({
  selector: 'cs-dashboard',
  templateUrl: './csdashboard.component.html',
  providers: [DatePipe]
})
export class CSDashboardComponent {
  constructor(private http: Http, private datepipe: DatePipe){}
  
}
