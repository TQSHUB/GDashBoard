import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JigMasterService } from '../../../Services/JiggManufacture/jigmaster.service';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { SearchPipeJigMaster } from './searchtable.pipe';

@Component({
    selector: 'jig-master',
    templateUrl: './jigmaster.component.html',
    providers: [ JigMasterService, SearchPipeJigMaster ]
})

export class JigMasterComponent{
    busy: Subscription;

    id;
    itemid;
    jiggname;
    aliasname;
    jiggid;

    txtjiggname;
    ddaliasname;

    allitems;
    alljiggmstdata_aliasname;

    display_message;
    display_message_class;

    insertJiggandItems;
    updateJiggandItems;
    deleteJiggandItems;

    caption = 'ADD';
    ResponseData;
    ResponseDataCopy;
    searchText;

   constructor(private router: Router, private jigmasterService: JigMasterService, private searchPipeJigMaster: SearchPipeJigMaster)
    {        
    }
    ngOnInit(){
        var script = document.createElement('script');
        document.body.appendChild(script);
        script.src = '../../assets/ComponentJs/JiggManufacture/jigmaster.component.js';

        this.getAllItems();
        this.getAllJiggMstDataAliasnames();
    }

    getAllItems()
    {
        this.jigmasterService.getAllItems().subscribe(res => {
            this.allitems = res.Data;
            //console.log(this.allitems);
            this.ResponseDataCopy = res.Data;
        });
    }

    getAllJiggMstDataAliasnames()
    {
        this.jigmasterService.getAllJiggMstDataAliasnames().subscribe(res => {
            this.alljiggmstdata_aliasname = res;
            //console.log(this.alljiggmstdata_aliasname);
            this.ResponseDataCopy = res;
        });
    }

    selectedJiggandAliasName(JiggandAliasName)
    {
        this.txtjiggname = JiggandAliasName.Jig_Code;

        this.itemid = JiggandAliasName.Item_Id;
        this.jiggid = JiggandAliasName.Id;
        $("#Item_Names").val(this.itemid);
        //console.log(this.itemid);

        this.caption = 'UPDATE';
    }

    createJiggandItemNames()
    {
        var ddaliasname = $("#Item_Names").val();

        this.jigmasterService.addNewJiggandItemNames(this.txtjiggname, ddaliasname)
            .subscribe(res => {
                this.insertJiggandItems = res;
                console.log(this.insertJiggandItems);

                if(this.insertJiggandItems)
                {
                    this.display_message = 'Jigg Master added successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';
                    this.clearValues();
                    this.getAllJiggMstDataAliasnames();
                }
                else
                {
                    this.display_message = 'Jigg Master not added successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                    this.clearValues();
                }
            });
    }

    updateJiggandItemNames()
    {
        this.jiggname = $("#txtjiggname").val();
        this.itemid = $("#Item_Names").val();

        this.jigmasterService.updateNewJiggandItemNames(this.itemid, this.txtjiggname, this.jiggid)
            .subscribe(res => {
                this.updateJiggandItems = res;
                
                if(this.updateJiggandItems)
                {
                    this.display_message = 'Jigg Master updated successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';
                    //console.log(this.itemid);
                    this.clearValues();
                    this.getAllJiggMstDataAliasnames();
                }
                else
                {
                    this.display_message = 'Jigg Master not updated successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                    this.clearValues();
                }
            });
    }

    deleteJiggandItemNames(deletedata)
    {
        this.jiggid = deletedata.Id;
        //console.log(this.jiggid);
        this.jigmasterService.deleteJiggandItemNames(this.jiggid)
            .subscribe(res => {
                this.deleteJiggandItemNames = res;

                if(this.deleteJiggandItemNames)
                {
                    this.display_message = 'Jigg Master deleted successfully';
                    this.display_message_class = 'alert alert-success alert-dismissible';
                    this.clearValues();
                    this.getAllJiggMstDataAliasnames();
                }
                else
                {
                    this.display_message = 'Jigg Master not deleted successfully';
                    this.display_message_class = 'alert alert-danger alert-dismissible';
                    this.clearValues();
                }
            });
    }

    FunctionOnCaption()
    {
        if(this.caption == 'ADD')
            this.createJiggandItemNames();
        if(this.caption == 'UPDATE')
            this.updateJiggandItemNames();
    }

    clearValues()
    {
        this.caption = 'ADD';
        this.txtjiggname = '';
        this.ddaliasname = '';

        setTimeout(()=> {
        this.display_message_class = '';
        this.display_message = '';
        }, 2000);
    }

    SearchTextBox()
    {
        var filterdata = this.searchPipeJigMaster.transform(this.ResponseDataCopy, this.searchText)
        if(filterdata == 'Empty')
            this.alljiggmstdata_aliasname = this.ResponseDataCopy;
        else
            this.alljiggmstdata_aliasname = filterdata;
    }
}