import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerMasterService } from '../../../Services/Masters/custmaster.service';
import { Ng2PaginationModule } from 'ng2-pagination';
//import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'customer-master',
    templateUrl: './custmaster.component.html',
    providers:[CustomerMasterService]
})
export class CustomerMasterComponent{
    busy: Subscription;
    allcustmasters: CustomerMaster[];

    code;
    txtcustomername;
    txtlongname;

    display_message;
    response: Response;
    display_message_class;

    caption = 'ADD';

    constructor(private router: Router, private customermasterService: CustomerMasterService)
    {
    }
    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/ComponentJs/Masters/custmaster.component.js';

        this.getAllCustomers();
    }

    getAllCustomers()
    {
        this.customermasterService.getAllCustomers().subscribe(res => {
            this.allcustmasters = res;
            console.log(this.allcustmasters);
        });
    }

    createCustMaster()
    {
        this.customermasterService.addNewCustomer(this.txtcustomername, this.txtlongname)
            .subscribe(res => {
                this.response = res;
                
                //Success and failure message code
                if(this.response.Data)
                {
                    this.display_message = 'Customer Master added successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';                    
                    this.clearValues();
                    this.getAllCustomers();
                }
                else
                {
                    this.display_message = 'Customer Master not added successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                }
            });
    }
    
    clearValues()
    {
        this.txtcustomername = '';
        this.txtlongname = '';
    }

    selectedCustomer(customer: CustomerMaster)
    {
        this.code = customer.Code;
        this.txtcustomername = customer.Name;
        this.txtlongname = customer.Name_2;
        this.caption = 'UPDATE';
    }

    FunctionOnCaption()
    {
        if(this.caption == 'ADD')
            this.createCustMaster();
        if(this.caption == 'UPDATE')
            console.log(this.caption);
            this.updateCustomer();
    }

    updateCustomer()
    {
        this.busy = this.customermasterService.updateCustomer(this.code, this.txtcustomername, this.txtlongname)
            .subscribe(res => {
                this.response = res;

                // Success and Failure message code
                if(this.response.Data)
                {
                this.display_message = 'Customer Master updated successfully.';
                this.display_message_class = 'alert alert-success alert-dismissible';
                this.clearValues();
                this.getAllCustomers();
                }
                else{
                this.display_message = 'Customer Master not updated successfully';
                this.display_message_class = 'alert alert-danger alert-dismissible';
                }
            });
    }
}

interface Response{
    Data: boolean;
}

interface CustomerMaster{
    Code: string;
    Name: string;
    Name_2: string;
}