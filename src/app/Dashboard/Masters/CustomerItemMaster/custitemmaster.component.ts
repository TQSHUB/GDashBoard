import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerItemMasterService } from '../../../Services/Masters/custitemmaster.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'customeritem-master',
    templateUrl: './custitemmaster.component.html',
    providers: [ CustomerItemMasterService]
})
export class CustomerItemMasterComponent{
    title = 'This is an Angular!';
    
    allcustmasters;
    allitemmasters;

    constructor(private router: Router, private customeritemmasterService: CustomerItemMasterService)
    {
    }
    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/component/custitemmaster.component.js';

        this.getAllCustomers();
        this.getAllItems();
    }

    getAllCustomers()
    {
        this.customeritemmasterService.getAllCustomers().subscribe(res => {
            this.allcustmasters = res;
            //console.log(this.allcustmasters);
        });
    }

    getAllItems()
    {
        this.customeritemmasterService.getAllItems().subscribe(res => {
            this.allitemmasters = res.Data;
            console.log(this.allitemmasters);
        });
    }
}