import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TopNavigationService } from '../../Services/topnavigation.service';
import * as $ from 'jquery';

@Component({
  selector: 'top-navigation',
  templateUrl: './topnavigation.component.html',
  providers: [TopNavigationService]
})
export class TopNavigationComponent {
    SelectedMonth;
    SelectedYear;
    NavigationPagesArray;
    UserName;


    constructor(private router: Router ,private topNavigationService: TopNavigationService){
        this.getNavigationPages();
    }

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = 'assets/ComponentJs/Template_Component/bindnavigation.component.js';

        this.UserName = localStorage.getItem('UserName');

        var date = new Date();
        var Month = (date.getMonth() + 1).toString();
        var Year = date.getFullYear().toString();
        $("#Month").val(date.getMonth() + 1);
        $("#Year").val(date.getFullYear());        

        localStorage.setItem('Month', Month);
        localStorage.setItem('Year', Year);
    }

    SearchChart(){
        localStorage.setItem('Month', $("#Month").val());
        localStorage.setItem('Year', $("#Year").val());

        this.router.navigate(['/Dashboard/'])
    }

    getNavigationPages(){
        this.topNavigationService.getNavigationPages(localStorage.getItem('UserName')).subscribe( res => {
            this.NavigationPagesArray = res.Data;
        });
    }
    SignOut(){
        localStorage.removeItem('Month');
        localStorage.removeItem('Year');
        localStorage.removeItem('UserName');
        this.router.navigate(['/Login']);
    }
}

