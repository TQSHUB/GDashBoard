import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TopNavigationService } from '../../Services/topnavigation.service';

@Component({
  selector: 'top-navigation',
  templateUrl: './topnavigation.component.html',
  providers: [TopNavigationService]
})
export class TopNavigationComponent {
  
    NavigationPagesArray;


    constructor(private router: Router ,private topNavigationService: TopNavigationService){
        this.getNavigationPages();
    }
    getNavigationPages(){
        this.topNavigationService.getNavigationPages('anusha').subscribe( res => {
            this.NavigationPagesArray = res.Data;
            console.log(this.NavigationPagesArray);
        });
    }
    SignOut(){
        this.router.navigate(['/Login']);
    }
}

