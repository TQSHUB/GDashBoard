import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent {
  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/plugins/datepicker/bootstrap-datepicker.js';

    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/plugins/select2/select2.full.min.js';

    
  }
}
