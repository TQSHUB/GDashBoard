import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JigMasterService } from '../../../Services/JiggManufacture/jigmaster.service';
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
    busy: Subscription;

    id;

    allitems;
    response;
    alljiggmstdata;
    alljiggmstdata_aliasname;

   constructor(private router: Router, private jigmasterService: JigMasterService)
    {        
    }
    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/ComponentJs/JiggManufacture/jigmaster.component.js';

        this.getAllItems();
        this.getAllJiggMstData();
        this.getAllJiggMstDataAliasnames();
    }

    getAllItems()
    {
        this.jigmasterService.getAllItems().subscribe(res => {
            this.allitems = res.Data;
            console.log(this.allitems);
        });
    }

    getAllJiggMstData()
    {
        this.jigmasterService.getAllJiggMstData().subscribe(res => {
            this.alljiggmstdata = res;
            console.log(this.alljiggmstdata);
        });
    }

    getAllJiggMstDataAliasnames()
    {
        this.jigmasterService.getAllJiggMstDataAliasnames(this.id).subscribe(res => {
            this.alljiggmstdata_aliasname = res;
            console.log(this.alljiggmstdata_aliasname);
        });
    }
}

/*interface Response{
    Data: boolean;
}*/