import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent {
  ngOnInit(){

    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/ComponentJs/Shared.js';
    
  }
}
