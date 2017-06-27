import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent {

  constructor(private router: Router){}
  ngOnInit(){

    // var script = document.createElement('script');
    // document.body.appendChild(script);
    // script.src = 'assets/ComponentJs/Shared.js';
  
    /*if(sessionStorage.getItem('UserName') === null)
    {
      this.router.navigate(['/Login'])      
    }
    else
    {*/
      this.router.navigate(['/Dashboard'])
    //}
  }
}
