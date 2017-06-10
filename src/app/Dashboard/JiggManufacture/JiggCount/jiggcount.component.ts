import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JiggCountData } from '../../../Services/JiggManufacture/jiggcount.service'
import { Subscription } from 'rxjs';
import * as $ from 'jquery';


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
  Selected_Alias_Names;
  Selected_JigCode;
  
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

    inStringBuilder(a: any){
    var i;
    var stringBuilder = '';
    for(i=0; i < a.length; i++)
    {
      if(i == a.length -1)
        stringBuilder = stringBuilder + '\'' + a[i] + '\'';
      else
        stringBuilder = stringBuilder + '\'' + a[i] + '\',';
    }
    return stringBuilder;
  }

  Search()
  {
              
              this.Selected_Alias_Names = $("#Alias_Names").val();
              this.Selected_JigCode = $("#JiggCode").val();
              var alias_string = this.inStringBuilder(this.Selected_Alias_Names);
              var JigCode = this.inStringBuilder(this.Selected_JigCode);
              if(alias_string == '')
                  alias_string = '';
              if(JigCode == '')
                    JigCode =''
              this.busy = this.jiggcountdata.getJigCount(JigCode,alias_string).subscribe(res => {
              this.ResponseData = JSON.parse(res);
              console.log(this.ResponseData);
              console.log(alias_string);
              console.log(JigCode);
      });
  }
}