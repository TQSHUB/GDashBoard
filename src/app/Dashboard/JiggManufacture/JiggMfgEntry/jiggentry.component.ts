import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JiggMfgEntry } from '../../../Services/JiggManufacture/jiggentry.service';
import { JsonDate } from '../../../Pipes/jsondate.pipe';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { SearchPipe } from './searchtable.pipe'


@Component({
  selector: 'jiggentrycomponent',
  templateUrl: './jiggentry.component.html',
  providers : [JiggMfgEntry, JsonDate, DatePipe,SearchPipe]
})

export class JiggEntry{

busy: Subscription;
allitems;
item = [];
ResponseData;
Headers1;
Headers2;
Headers3;

flagdis = false;
flagdisable =true;


txtaliasname;
txtroundqty;
txtjigg;
caption = 'Add Item';
display_totalhandlingdefects;
display_Totaltechnicaldefects;
display_totalhandlingdefectsrect;
display_Totaltechnicaldefectsrect;

id;
i;
CoatingPuntureBase;
CPSKIP;
SETTING;
JiggBand;
PinHole;
JiggBroken;
ContactBroken;
Contactabression;
CoatingonPuntureonJigg;
ContactBurn;
CoatingBurn;
ECN;
Others;
ResponseDataCopy;

nop;
noc;
noa;
dpdoj;
dpdoj1;
response: Response;
display_message;
display_message_class;
searchText;
UserName;

coatingpunturebase;
ecn;
coatingskip;
setting;
pinhole;
jiggband;
contactbroken;
jiggbroken;
contactabression;
coatingonpuntureonjigg;
contactburn;
coatingburn;
others;
TotalTechnicalDefects;
TotalHandlingDefects;
flag;
jiggmst;

  constructor(private router:Router, private jiggentry:JiggMfgEntry, private jsondate: JsonDate, private datepipe: DatePipe,private searchPipe: SearchPipe){
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
 
   FunctionOnCaption(){
    if(this.caption == 'Update')
      this.updateJigg();
    if(this.caption == 'Add Item')
      this.createJigg();
  }
  createJigg(){
     this.nop = $("#Alias_Name").val();
    
     this.noa = $("#natureofcomp1").val();
     this.dpdoj = $("input[name=dpdoj]").val();
     this.UserName = localStorage.getItem('UserName');
     console.log(this.UserName);

     if(this.noa == "N")
     {
        this.jiggmst = 1;
        this.noc = "NEW JIGG"
     }
     else
     {
       this.jiggmst = 0;
       this.noc = $("#natureofcomp").val();
     }
    if($("#coatingpunturebase").is(':checked'))
      this.coatingpunturebase = 1;
    else
      this.coatingpunturebase = 0;
     console.log($("#coatingpunturebase").is(':checked'));

    if($("#coatingskip").is(':checked'))
      this.coatingskip = 1;
    else
      this.coatingskip = 0;
     console.log($("#coatingskip").is(':checked'));

    if($("#setting").is(':checked'))
      this.setting = 1;
    else
      this.setting = 0;
     console.log($("#setting").is(':checked'));

    if($("#pinhole").is(':checked'))
      this.pinhole = 1;
    else
      this.pinhole = 0;
     console.log($("#pinhole").is(':checked'));

    if($("#jiggband").is(':checked'))
      this.jiggband = 1;
    else
      this.jiggband = 0;
     console.log($("#jiggband").is(':checked'));

    if($("#contactbroken").is(':checked'))
      this.contactbroken = 1;
    else
      this.contactbroken = 0;
     console.log($("#contactbroken").is(':checked'));

    if($("#jiggbroken").is(':checked'))
      this.jiggbroken = 1;
    else
      this.jiggbroken = 0;
     console.log($("#jiggbroken").is(':checked'));

    if($("#contactabression").is(':checked'))
      this.contactabression = 1;
    else
      this.contactabression = 0;
     console.log($("#contactabression").is(':checked'));

    if($("#coatingonpuntureonjigg").is(':checked'))
      this.coatingonpuntureonjigg = 1;
    else
      this.coatingonpuntureonjigg = 0;
     console.log($("#coatingonpuntureonjigg").is(':checked'));

    if($("#contactburn").is(':checked'))
      this.contactburn = 1;
    else
      this.contactburn = 0;
     console.log($("#contactburn").is(':checked'));

    if($("#coatingburn").is(':checked'))
      this.coatingburn = 1;
    else
      this.coatingburn = 0;
     console.log($("#pinhole").is(':checked'));
    
    if($("#ecn").is(':checked'))
     this.ecn = 1;
    else
      this.ecn = 0;
     console.log($("#ecn").is(':checked'));

      if($("#others").is(':checked'))
     this.others = 1;
    else
      this.others = 0;
     console.log($("#others").is(':checked'));

     this.TotalTechnicalDefects = this.coatingskip + this.pinhole + this.contactbroken + this.contactabression + this.coatingonpuntureonjigg + this.contactburn + this.coatingburn + this.ecn + this.others;
     console.log(this.TotalTechnicalDefects);

     this. TotalHandlingDefects = this.coatingpunturebase + this.setting + this.jiggband + this.jiggbroken;
     console.log(this.TotalHandlingDefects);

     this.flag =0;
     this.busy = this.jiggentry.addNewJigg(this.nop,this.noc,this.noa,this.dpdoj,this.coatingpunturebase,this.coatingskip,this.setting,this.pinhole,this.jiggband,this.contactbroken,this.jiggbroken,this.contactabression,this.coatingonpuntureonjigg,this.contactburn,this.coatingburn,this.others,this.ecn,this.TotalTechnicalDefects,this.TotalHandlingDefects,this.flag,this.jiggmst,this.UserName)
    .subscribe(res=>{
      this.response = res;
      if(this.response.Data)
      {
          this.display_message = 'Recieved Data Saved Successfully..!';
          this.display_message_class = 'alert alert-success alert-dismissible'
          console.log(this.noc);
          this.display_totalhandlingdefects = this.TotalHandlingDefects;
           this.display_Totaltechnicaldefects = this.TotalTechnicalDefects;
          // console.log(this.response);
          // console.log(this.coatingpunturebase);
          // console.log(this.coatingskip);
          // console.log(this.setting);
          // console.log(this.pinhole);
          // console.log(this.jiggband);
          // console.log(this.contactbroken);
          // console.log(this.jiggbroken);
          // console.log(this.contactabression);
          // console.log(this.coatingonpuntureonjigg);
          // console.log(this.contactburn);
          // console.log(this.coatingburn);
          // console.log(this.ecn);
          // console.log(this.others);
          // console.log(this.flag)
          console.log(this.jiggmst)
          this.Search();
          this.clearValues();
      }
      else
      {
              this.display_message = 'Dulpicate Jigg';
              this.display_message_class = 'alert alert-danger alert-dismissible';
               this.clearValues();
      }
    })
  }


    updateJigg(){
     this.nop = $("#Alias_Name").val();
     this.noc = $("#natureofcomp").val();
     this.noa = $("#natureofcomp1").val();
     this.dpdoj = $("input[name=dpdoj1]").val();
    
    if($("#CoatingPuntureBase").is(':checked'))
      this.CoatingPuntureBase = 1;
    else
      this.CoatingPuntureBase = 0;
     console.log($("#CoatingPuntureBase").is(':checked'));

    if($("#CPSKIP").is(':checked'))
      this.CPSKIP = 1;
    else
      this.CPSKIP = 0;
     console.log($("#CPSKIP").is(':checked'));

    if($("#SETTING").is(':checked'))
      this.SETTING = 1;
    else
      this.SETTING = 0;
     console.log($("#SETTING").is(':checked'));

    if($("#PinHole").is(':checked'))
      this.PinHole = 1;
    else
      this.PinHole = 0;
     console.log($("#PinHole").is(':checked'));

    if($("#JiggBand").is(':checked'))
      this.JiggBand = 1;
    else
      this.JiggBand = 0;
     console.log($("#JiggBand").is(':checked'));

    if($("#ContactBroken").is(':checked'))
      this.ContactBroken = 1;
    else
      this.ContactBroken = 0;
     console.log($("#ContactBroken").is(':checked'));

    if($("#JiggBroken").is(':checked'))
      this.JiggBroken = 1;
    else
      this.JiggBroken = 0;
     console.log($("#JiggBroken").is(':checked'));

    if($("#Contactabression").is(':checked'))
      this.Contactabression = 1;
    else
      this.Contactabression = 0;
     console.log($("#Contactabression").is(':checked'));

    if($("#CoatingonPuntureonJigg").is(':checked'))
      this.CoatingonPuntureonJigg = 1;
    else
      this.CoatingonPuntureonJigg = 0;
     console.log($("#CoatingonPuntureonJigg").is(':checked'));

    if($("#ContactBurn").is(':checked'))
      this.ContactBurn = 1;
    else
      this.ContactBurn = 0;
     console.log($("#ContactBurn").is(':checked'));

    if($("#CoatingBurn").is(':checked'))
      this.CoatingBurn = 1;
    else
      this.CoatingBurn = 0;
     console.log($("#CoatingBurn").is(':checked'));
    
    if($("#ECN").is(':checked'))
     this.ECN = 1;
    else
      this.ECN = 0;
     console.log($("#ECN").is(':checked'));

      if($("#Others").is(':checked'))
     this.Others = 1;
    else
      this.Others = 0;
     console.log($("#others").is(':checked'));

     this.TotalTechnicalDefects = this.CPSKIP + this.PinHole + this.ContactBroken + this.Contactabression + this.CoatingonPuntureonJigg + this.ContactBurn + this.CoatingBurn + this.ECN + this.Others;
     console.log(this.TotalTechnicalDefects);

     this. TotalHandlingDefects = this.CoatingPuntureBase + this.SETTING + this.JiggBand + this.JiggBroken;
     console.log(this.TotalHandlingDefects);
      this.flag = 0;
     this.busy = this.jiggentry.UpdateJigg(this.nop,this.noc,this.noa,this.dpdoj,this.CoatingPuntureBase,this.CPSKIP,this.SETTING,this.PinHole,this.JiggBand,this.ContactBroken,this.JiggBroken,this.Contactabression,this.CoatingonPuntureonJigg,this.ContactBurn,this.CoatingBurn,this.Others,this.ECN,this.TotalTechnicalDefects,this.TotalHandlingDefects,this.flag,this.txtjigg)
    .subscribe(res=>{
      this.response = res;
      if(this.response.Data)
      {
          this.display_message = 'Rectified Data Saved Successfully..!';
          this.display_message_class = 'alert alert-success alert-dismissible'
           this.display_totalhandlingdefectsrect = this.TotalHandlingDefects;
           this.display_Totaltechnicaldefectsrect = this.TotalTechnicalDefects;
          console.log(this.noa);
          console.log(this.response);
          console.log(this.CoatingPuntureBase);
          console.log(this.CPSKIP);
          console.log(this.SETTING);
          console.log(this.PinHole);
          console.log(this.JiggBand);
          console.log(this.ContactBroken);
          console.log(this.JiggBroken);
          console.log(this.Contactabression);
          console.log(this.CoatingonPuntureonJigg);
          console.log(this.ContactBurn);
          console.log(this.CoatingBurn);
          console.log(this.ECN);
          console.log(this.Others);
          console.log(this.noa);
          console.log(this.txtjigg)
          this.clearValues();
      }
      else
      {
              this.display_message = 'Duplicate Jigg ';
              this.display_message_class = 'alert alert-danger alert-dismissible';
               this.clearValues();
      }
    })
  }


  clearValues()
    {
        this.txtjigg = '';
        this.txtaliasname = '';
        this.txtroundqty = '';
        this.caption = 'Add Item';
        this.dpdoj ='';
        this.dpdoj1 ='';
        
       
        setTimeout(()=> {
        this.display_totalhandlingdefects;
        this.display_totalhandlingdefectsrect;
        this.display_Totaltechnicaldefects;
        this.display_Totaltechnicaldefectsrect;
        this.display_message_class = '';
        this.display_message = '';
        }, 4000);
    }

 Search(){
          
          this.busy = this.jiggentry.getjiggdata('','').subscribe(res=>{
          this.ResponseData =JSON.parse(res.Data.JsonData);
          this.ResponseDataCopy = JSON.parse(res.Data.JsonData);
          this.Headers1 =res.Data.Headers1;
          this.Headers2 =res.Data.Headers2;
          this.Headers3 =res.Data.Headers3;
          console.log(this.ResponseData);
          console.log(this.ResponseDataCopy);
      })
    }
    selectedItem(item, i){
      $("#Alias_Name").val(item.item_id); 
             
      this.busy = this.jiggentry.getAllJiggCode(item.item_id).subscribe(res => {
           this.item = res;
           
           setTimeout(()=> {
            $("#natureofcomp").val(item['Jigg Code']);
            }, 1000);

           
      });  
      //this.datepipe.transform(item.Doj,'MM/dd/yyyy');
      //$("#datepicker").val(item['Received Date']);
      //$("#natureofcomp").val(item['Jigg Code']);   
      $("#natureofcomp1").val(item['Jigg Purpose']); 

      $("#datepicker").val(this.datepipe.transform(this.jsondate.transform(item['Received Date']),'dd/MM/yyyy'));
     
     
     this.caption = 'Update';
     this.id= item.ItemId;
     var id = 'row' + i ;
     console.log(item);
    
    this.flagdis = true;
    this.flagdisable = false;

     var value = $(document.getElementById(id + '0')).is(':checked');
      if(value)
      this.CoatingPuntureBase = true;
    else
      this.CoatingPuntureBase = false;
     console.log(value);

     var value = $(document.getElementById(id + '1')).is(':checked');
      if(value)
      this.SETTING = true;
    else
      this.SETTING = false;
     console.log(value);

    var value = $(document.getElementById(id + '2')).is(':checked');
      if(value)
      this.JiggBand = true;
    else
      this.JiggBand = false;
     console.log(value);

      var value = $(document.getElementById(id + '3')).is(':checked');
      if(value)
      this.JiggBroken = true;
    else
      this.JiggBroken = false;
     console.log(value);

     var value = $(document.getElementById(id + '4')).is(':checked');
      if(value)
      this.CPSKIP = true;
    else
      this.CPSKIP = false;
     console.log(value);

      var value = $(document.getElementById( id + "5")).is(':checked');
      if(value)
      this.PinHole = true;
    else
      this.PinHole = false;
     console.log(value);

      var value = $(document.getElementById(id + '6')).is(':checked');
      if(value)
      this.ContactBroken = true;
    else
      this.ContactBroken = false;
     console.log(value);

      var value = $(document.getElementById(id + '7')).is(':checked');
      if(value)
      this.Contactabression = true;
    else
      this.Contactabression = false;
     console.log(value);

      var value = $(document.getElementById(id + '8')).is(':checked');
      if(value)
      this.CoatingonPuntureonJigg = true;
    else
      this.CoatingonPuntureonJigg = false;
     console.log(value);

      var value = $(document.getElementById(id + '9')).is(':checked');
      if(value)
      this.ContactBurn = true;
    else
      this.ContactBurn = false;
     console.log(value);

      var value = $(document.getElementById(id + '10')).is(':checked');
      if(value)
      this.CoatingBurn = true;
    else
      this.CoatingBurn = false;
     console.log(value);

      var value = $(document.getElementById(id + '11')).is(':checked');
      if(value)
      this.ECN = true;
    else
      this.ECN = false;
     console.log(value);

      var value = $(document.getElementById(id + '12')).is(':checked');
      if(value)
      this.Others = true;
    else
      this.Others = false;
     console.log(value);

     /*for(k = 0; k< 13; k++)
     {
        var string = 'row' + i + k;
        var value = $(document.getElementById(string)).is(':checked');
        if(value)
          this.
        console.log(value);
     }*/
     /*console.log(item);*/
    
  }

   SearchTextBox(){
    var filterData = this.searchPipe.transform(this.ResponseDataCopy, this.searchText);
    if(filterData == 'Empty')
      this.ResponseData = this.ResponseDataCopy;
    else
      this.ResponseData = filterData;
  }
 
  isValidForm() {
    return this.txtroundqty;
}


}

interface Response{
  Data: boolean;
}