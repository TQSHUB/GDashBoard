import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'schedule-edit',
  templateUrl: './scheduleedit.component.html',

})
export class ScheduleEditComponent {
  
  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/ComponentJs/PPC/scheduleedit.component.js';
  }

}
