import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FrmLoadingService } from '../../../Services/Masters/frmloading.service';
import {DatePipe} from '@angular/common';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';


@Component({
  selector: 'frmloadingcomponent',
  templateUrl: './frmloading.component.html',
  providers : [FrmLoadingService,DatePipe]
})

export class FrmLoading{
    p;
    busy: Subscription;
    allitem;
    FromDate;
    ToDate;
    ResponseData;

    txtqty;
    id;
    txtcomponentname;
    noc;
    display_message;
    display_message_class;
    response;

    constructor(private router:Router,private frmloadingservice : FrmLoadingService,private datepipe: DatePipe){

    }

     clearValues(){
    this.txtcomponentname = '';
    this.txtqty = '';
    
    setTimeout(() => {
      this.display_message = '';
      this.display_message_class = '';
    }, 2000);
  }

    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/Masters/frmloading.component.js';

        this.getAllItem();
        this.Search();
    }
    selectedItem(item){
     this.id= item.ItemId;
      $("#natureofcomp").val(item.ItemId.trim());  
      this.txtqty = item.Qty;
    ////console.log.log(this.id);
    
  }
  updateFrmloading(){
      this.noc = $("#natureofcomp").val();
      //console.log.log(this.noc);
      this.busy = this.frmloadingservice.updateFrmloading(this.noc,this.txtqty)
        .subscribe(res=>{
        this.response = res;
        //console.log.log(this.noc)
      if(this.response.Data)
      {
          this.display_message = 'Item UPdate Successfully.';
          this.display_message_class = 'alert alert-success alert-dismissible'
          this.clearValues();
          this.Search();
      }
      else
      {
              this.display_message = 'Item not UPdate Successfully';
              this.display_message_class = 'alert alert-danger alert-dismissible';
              this.clearValues();
      }
    })
  }

    Search(){
        var FromDate = $("input[name=FromDate]").val();
         var ToDate = $("input[name=ToDate]").val();  

           if(FromDate == '' && ToDate == '' )
           { 
               this.FromDate = '';
               this.ToDate = '';
           }
           else
           {
                this.FromDate = this.datepipe.transform(FromDate,"MM/dd/yyyy");
                this.ToDate = this.datepipe.transform(ToDate,"MM/dd/yyyy"); 
           }
          this.busy = this.frmloadingservice.getFrmLoading(this.FromDate,this.ToDate).subscribe(res=>{
          this.ResponseData =res.Data;
          
      })
    }

    getAllItem(){
        this.frmloadingservice.getAllItem().subscribe(res=>{
            this.allitem =res.Data;
            
        })
    }

}

