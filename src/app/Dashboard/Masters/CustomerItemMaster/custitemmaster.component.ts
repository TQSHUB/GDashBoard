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

    display_message;
    response: Response;
    display_message_class;

    constructor(private router: Router, private customeritemmasterService: CustomerItemMasterService)
    {
    }
    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/ComponentJs/Masters/custitemmaster.component.js';

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
        console.log(this.itemid);
        this.customeritemmasterService.getAllCutomerItems(this.itemid).subscribe(res => {
            this.allcustitemmasters = res;
            console.log(this.allcustitemmasters);
        });
    }

    createCustomerItemMaster()
    {
        this.customeritemmasterService.addNewCustomerItem(this.ddcustomername, this.ddaliasname)
            .subscribe(res => {
                this.insertcustitems = res;
                
                //Success and failure message code
                if(this.response)
                {
                    this.display_message = 'Customer Master added successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';                    
                    this.clearValues();
                }
                else
                {
                    this.display_message = 'Customer Master not added successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                }
            });
    }

    selectedCustomerItem(CustomerItem)
    {
        this.itemid = CustomerItem.ItemId;
        this.ddcustomername = CustomerItem.Name;
        this.ddaliasname = CustomerItem.Alias_Name;
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
        this.ddcustomername = '';
        this.ddaliasname = '';
    }

    updateCustomerItem(itemid: string, customername: string, itemname: string)
    {
        this.busy = this.customeritemmasterService.updateCustomerItem(this.itemid, this.ddcustomername, this.ddaliasname)
            .subscribe(res => {
                this.updatecustitems = res;

                //Success and failure message code
                if(this.response)
                {
                    this.display_message = 'Customer Master updated successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';                    
                    this.clearValues();
                }
                else
                {
                    this.display_message = 'Customer Master not updated successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                }
            });
    }
}

interface Response{
    Data: boolean;
}

/*interface CustomerItemMaster
{
    ItemId: string;
    Name: string;
    Alias_Name: string;
}*/