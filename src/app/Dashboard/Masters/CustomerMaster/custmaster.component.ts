import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerMasterService } from '../../../Services/Masters/custmaster.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'customer-master',
    templateUrl: './custmaster.component.html',
    providers:[CustomerMasterService]
})
export class CustomerMasterComponent{
    title = 'This is an Angular!';
    //allcustmasters: CustomerMaster[];

    txtcustomername;
    txtlongname;

    display_message;
    response: Response;
    display_message_class;

    constructor(private router: Router, private customermasterService: CustomerMasterService)
    {

    }
    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../assets/component/custmaster.component.js';
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
                    this.display_message_class = 'bg-success';
                    this.clearValues();
                }
                else
                {
                    this.display_message = 'Customer Master not added successfully';
                    this.display_message_class = 'bg-danger';
                }
            });
    }
    
    clearValues()
    {
        this.txtcustomername = '';
        this.txtlongname = '';
    }
}

interface Response{
    Data: boolean;
}

/*interface CustomerMaster{
    CustomerName: string;
    LongName: string;
}*/