import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JigMasterService } from '../../../Services/Jigg Manufacture/jigmaster.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'jig-master',
    templateUrl: './jigmaster.component.html',
    providers: [ JigMasterService ]
})

export class JigMasterComponent{
    title = 'This is an Angular!';

    allitems;
    response: Response;

    constructor(private router: Router, private jigmasterService: JigMasterService)
    {        
    }
    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/component/jigmaster.component.js';

        this.getAllItems();
    }

    getAllItems()
    {
        this.jigmasterService.getAllItems().subscribe(res => {
            this.allitems = res.Data;
            console.log(this.allitems);
        });
    }
}

interface Response{
    Data: boolean;
}