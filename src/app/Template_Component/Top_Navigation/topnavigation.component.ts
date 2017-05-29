import { Component } from '@angular/core';
import { TopNavigationService } from '../../Services/topnavigation.service';

@Component({
  selector: 'top-navigation',
  templateUrl: './topnavigation.component.html',
  providers: [TopNavigationService]
})
export class TopNavigation {
  
    NavigationPagesArray;


    constructor(private topNavigationService: TopNavigationService){
        this.getNavigationPages();
    }
    getNavigationPages(){
        this.topNavigationService.getNavigationPages('anusha').subscribe( res => {
            this.NavigationPagesArray = res.Data;
            console.log(this.NavigationPagesArray);
        });
    }
}

