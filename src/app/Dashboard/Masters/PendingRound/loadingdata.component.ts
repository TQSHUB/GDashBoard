import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common'

@Component({
  selector: 'loadingdatacomponent',
  templateUrl: './loadingdata.component.html',
  providers : [DatePipe]
})

export class LoadingData{

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/ComponentJs/Master/loadingdata.component.js';
    }

}