import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerItemMasterService } from '../../../Services/Masters/custitemmaster.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

@Component({
    selector: 'customeritem-master',
    templateUrl: './custitemmaster.component.html',
    providers: [ CustomerItemMasterService]
})
export class CustomerItemMasterComponent{
    busy: Subscription;

    allcustitemmasters;
    allcustmasters;
    allitemmasters;
    insertcustitems;
    updatecustitems;

    itemid;
    ddcustomername;
    ddaliasname;

    customername;
    aliasname;

    display_message;
    response;
    display_message_class;

    caption = 'ADD';

    constructor(private router: Router, private customeritemmasterService: CustomerItemMasterService)
    {
    }
    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/Masters/custitemmaster.component.js';

        this.getAllCustomers();
        this.getAllItems();
        this.getAllCustomerItems();
    }

    getAllCustomers()
    {
        this.customeritemmasterService.getAllCustomers().subscribe(res => {
            this.allcustmasters = res;
            //console.log(this.allcustmasters);
        });
    }

    getAllItems()
    {
        this.customeritemmasterService.getAllItems().subscribe(res => {
            this.allitemmasters = res.Data;
            console.log(this.allitemmasters);
        });
    }

    getAllCustomerItems()
    {
        this.customeritemmasterService.getAllCutomerItems(this.itemid).subscribe(res => {
            this.allcustitemmasters = res.Data;
            console.log(this.allcustitemmasters);
        });
    }

    createCustomerItemMaster()
    {
        var ddcustomername = $("#Customer_Names").val();
        var ddaliasname = $("#Item_Names").val();

        this.customeritemmasterService.addNewCustomerItem(ddcustomername, ddaliasname, this.itemid)
            .subscribe(res => {
                this.insertcustitems = res;
                console.log(this.insertcustitems);
                
                //Success and failure message code
                if(this.insertcustitems)
                {
                    this.display_message = 'Customer Item Master added successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';
                    this.clearValues();
                    this.getAllItems();
                    this.getAllCustomers();
                    this.getAllCustomerItems();
                }
                else
                {
                    this.display_message = 'Customer Item Master not added successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                    this.clearValues();
                }
            });
    }

    selectedCustomerItem(CustomerItem)
    {
        this.aliasname = CustomerItem.Alias_Name;

        this.itemid = CustomerItem.ItemId;
        $("#Item_Names").val(CustomerItem.ItemId);
        console.log(this.itemid);

        this.caption = 'UPDATE';
    }

    searchCustomerItems()
    {
        var CustomerName = $("#Customer_Names").val();
        
        this.busy = this.customeritemmasterService.getAllCutomerItems(CustomerName).subscribe(res => {
            this.allcustitemmasters = res;
            console.log(this.allcustitemmasters);                
        });
    }

    clearValues()
    {
        this.caption = 'ADD';
        this.ddcustomername = '';
        this.ddaliasname = '';

        setTimeout(()=> {
        this.display_message_class = '';
        this.display_message = '';
        }, 2000);
    }

    FunctionOnCaption()
    {
        if(this.caption == 'ADD')
            this.createCustomerItemMaster();
        if(this.caption == 'UPDATE')
            //console.log(this.caption);
            this.updateCustomerItem(this.itemid, this.customername, this.aliasname);
    }

    updateCustomerItem(itemid: string, customername: string, itemname: string)
    {
        this.aliasname = $("#Item_Names").val();
        console.log(this.aliasname);

        this.busy = this.customeritemmasterService.updateCustomerItem(this.itemid, this.ddcustomername, this.ddaliasname)
            .subscribe(res => {
                this.updatecustitems = res;

                //Success and failure message code
                if(this.updatecustitems)
                {
                    this.display_message = 'Customer Master updated successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';                    
                    this.clearValues();
                    this.getAllItems();
                    this.getAllCustomers();
                    this.getAllCustomerItems();
                }
                else
                {
                    this.display_message = 'Customer Master not updated successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                }
            });
    }
}

/*interface Response{
    Data: boolean;
}*/

/*interface CustomerItemMaster
{
    ItemId: string;
    Name: string;
    Alias_Name: string;
}*/