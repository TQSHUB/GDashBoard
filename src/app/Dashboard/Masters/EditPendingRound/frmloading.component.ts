import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FrmLoadingService } from '../../../Services/Master/frmloading.service';


@Component({
  selector: 'frmloadingcomponent',
  templateUrl: './frmloading.component.html',
  providers : [FrmLoadingService]
})

export class FrmLoading{
    
    allitem;

    constructor(private router:Router,private frmloadingservice : FrmLoadingService){

    }

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/ComponentJs/Master/frmloading.component.js';

        this.getAllItem();
    }

    getAllItem(){
        this.frmloadingservice.getAllItem().subscribe(res=>{
            this.allitem =res.Data;
            console.log(this.allitem);
        })
    }

}