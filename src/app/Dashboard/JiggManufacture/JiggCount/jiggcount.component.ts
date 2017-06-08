import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JiggCountData } from '../../../Services/JiggManufacture/jiggcount.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'jiggcount',
  templateUrl: './jiggcount.component.html',
  providers: [JiggCountData],
})

export class JiggCount{  
  
  busy: Subscription;
  Alias_Names;
  JigCode;
  ResponseData;
  
  constructor(private jiggcountdata:JiggCountData){} 

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.src = 'assets/ComponentJs/JiggManufacture/jiggcount.component.js';
    this.getBindItems_ByAliasName();
    this.getJiggcode();
    this.Search();
} 

  getBindItems_ByAliasName(){
    this.jiggcountdata.getBindItems_ByAliasName().subscribe(res => {
      this.Alias_Names = res.Data;
    });
  }

   getJiggcode(){
    this.jiggcountdata.getJiggCode().subscribe(res => {
      this.JigCode = res.Data;
    });
  }

  Search()
  {
        this.busy = this.jiggcountdata.getJigCount('','').subscribe(res => {
        this.ResponseData = res.Data;
        console.log(this.ResponseData);
      });
  }
}