import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JiggMfgEntry } from '../../../Services/JiggManufacture/jiggentry.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';


@Component({
  selector: 'jiggentrycomponent',
  templateUrl: './jiggentry.component.html',
  providers : [JiggMfgEntry ]
})

export class JiggEntry{

busy: Subscription;
allitems;
item = [];
ResponseData;
TopHeader = [];

constructor(private router:Router, private jiggentry:JiggMfgEntry){
   
  }
 ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/ComponentJs/JiggManufacture/jiggentry.component.js';

        this.getAllItem();
        this.Search();
    }


  getAllItem(){
   this.busy =  this.jiggentry.getAllItem().subscribe(res=>{
      this.allitems =res.Data;
    })
  }

  selectedJiggcode(){
    var ItemName = $("#Alias_Name").val();
    console.log(ItemName)
    this.busy = this.jiggentry.getAllJiggCode(ItemName).subscribe(res => {
           this.item = res;
        });
  }

 Search(){
          
          this.busy = this.jiggentry.getjiggdata('','').subscribe(res=>{
          this.ResponseData =JSON.parse(res.Data.JsonData);
          this.TopHeader =res.Data.Headers;
          console.log(this.ResponseData);
      })
    }
}