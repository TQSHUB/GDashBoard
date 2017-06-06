import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../../Services/Masters/item.service';
import { GenericTableComponent ,GtConfig } from '@angular-generic-table/core';
import { SearchPipe } from './searchtable.pipe'
import * as $ from 'jquery';
import { Subscription } from 'rxjs';


@Component({
  selector: 'itemcomponent',
  templateUrl: './item.component.html',
  providers : [ItemService,SearchPipe ]
})
export class ItemComponent {

  allitems ;
  busy: Subscription;
  ResponseDataCopy;
  ResponseData;
  searchText;

  Additem : String;
  updateitem :string; 
  code;
  txtaliasname;
  txtcomponentname;
  txtrate;
  txtselectcomponent;
  txtroundqty;
  txtuom;
  txtplating;
  nop;
  noc;
  caption = 'Add Item';

  display_message;
  display_message_sign;
  response: Response;
  display_message_class;

  constructor(private router:Router, private itemservice:ItemService,private searchPipe: SearchPipe){
   
  }

  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script);

    this.getAllItem();
  }

  clearvalue(){
  this.txtaliasname = '';
  this.txtcomponentname = '';
  this.txtrate = '';
  this.txtselectcomponent = '';
  this.txtroundqty = '';
  this.txtuom = '';
  this.txtplating = '';
  this.caption = 'Add Item';
  
  setTimeout(()=> {
      this.display_message_class = '';
      this.display_message = '';
    }, 2000);
  }

  getAllItem(){
   this.busy =  this.itemservice.getAllItem().subscribe(res=>{
      this.allitems =res.Data;
      this.ResponseDataCopy = res.Data;
    })
  }

  selectedItem(item : Item){
    var nop = item.Nature_of_Plating;
    var noc = item.Nature_of_Comp;
   

    this.code =item.Code;
    this.txtaliasname = item.Alias_Name;
    this.txtcomponentname = item.Component_Name;
    this.txtrate = item.Rate;
     $("#natureofcomp").val(item.Nature_of_Comp.trim());
    this.txtroundqty = item.Round_Qty;
    this.txtuom = item.Uom;
    $("#natureofplating").val(item.Nature_of_Plating.trim());
    this.nop = item.Nature_of_Plating;
    this.caption = 'Update';
  }

  FunctionOnCaption(){
    if(this.caption == 'Update')
      this.updateItem();
    if(this.caption == 'Add Item')
      this.createItem();
  }

  createItem(){
    
      this.nop = $("#natureofplating").val();
     this.noc = $("#natureofcomp").val();
     
     this.busy = this.itemservice.addNewItem(this.txtaliasname,this.txtcomponentname,this.txtrate,this.noc,this.txtroundqty,this.txtuom,this.nop)
    .subscribe(res=>{
      this.response = res;
     
      if(this.response.Data)
      {
          this.display_message = 'Item Added Successfully.';
          this.display_message_class = 'alert alert-success alert-dismissible'
          console.log(this.createItem);
          this.clearvalue();
          this.getAllItem();

      }
      else
      {
              this.display_message = 'Item not Added Successfully';
              this.display_message_class = 'alert alert-danger alert-dismissible';
              this.clearvalue();
      }
    })
  }

  updateItem(){
         this.nop = $("#natureofplating").val();
         this.noc = $("#natureofcomp").val();
         this.busy = this.itemservice.updateItem(this.code,this.txtaliasname,this.txtcomponentname,this.txtrate,this.noc,this.txtroundqty,this.txtuom,this.nop)
        .subscribe(res=>{
        this.response = res;
     
      if(this.response.Data)
      {
          this.display_message = 'Item UPdate Successfully.';
          this.display_message_class = 'alert alert-success alert-dismissible'
          console.log(this.createItem);
          this.clearvalue();
          this.getAllItem();

      }
      else
      {
              this.display_message = 'Item not UPdate Successfully';
              this.display_message_class = 'alert alert-danger alert-dismissible';
      }
    })
  }

  SearchTextBox(){
    var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
    if(filterData == 'Empty')
      this.allitems = this.ResponseDataCopy;
    else
      this.allitems = filterData;
  }
}
interface Response{
  Data: boolean;
}

interface Item{
  Code: string;
  Alias_Name : String;
  Component_Name : String;
  Rate :String;
  Nature_of_Comp : String;
  Round_Qty : String;
  Uom : String;
  Nature_of_Plating : String;
}