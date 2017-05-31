import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../../Services/Masters/item.service';
import * as $ from 'jquery';

@Component({
  selector: 'itemcomponent',
  templateUrl: './item.component.html',
  providers : [ItemService]
})
export class ItemComponent {

  txtaliasname;
  txtcomponentname;
  txtrate;
  txtselectcomponent;
  txtroundqty;
  txtuom;
  txtplating;
  nop;
  noc;

  display_message;
  display_message_sign;
  response: Response;
  display_message_class;

  constructor(private router:Router, private itemservice:ItemService){

  }

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);
  }

  clearvalue(){
  this.txtaliasname = '';
  this.txtcomponentname = '';
  this.txtrate = '';
  this.txtselectcomponent = '';
  this.txtroundqty = '';
  this.txtuom = '';
  this.txtplating = '';
  
  setTimeout(()=> {
      this.display_message_class = '';
      this.display_message = '';
    }, 2000);
  }

  createItem(){
    
      this.nop = $("#natureofplating").val();
     this.noc = $("#natureofcomp").val();
     console.log(this.noc);
    this.itemservice.addNewItem(this.txtaliasname,this.txtcomponentname,this.txtrate,this.noc,this.txtroundqty,this.txtuom,this.nop)
    .subscribe(res=>{
      this.response = res;
     
      if(this.response.Data)
      {
          this.display_message = 'Item Added Successfully.';
          this.display_message_class = 'alert alert-success alert-dismissible'
          console.log(this.createItem);
          this.clearvalue();

      }
      else
      {
              this.display_message = 'Item not Added Successfully';
              this.display_message_class = 'alert alert-danger alert-dismissible';
      }
    })
  }
}
interface Response{
  Data: boolean;
}