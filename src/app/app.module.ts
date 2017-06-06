import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Pagination
import {Ng2PaginationModule} from 'ng2-pagination';

//Generic Table Imports
import { GenericTableModule } from '@angular-generic-table/core';
import { ColumnSettingsModule } from "@angular-generic-table/column-settings/column-settings.module";

//Busy Module
import {BusyModule} from 'angular2-busy';

//Routing Module
import { routing } from './app.routing';

import { AppComponent } from './app.component';

//Template Components
import { TopNavigationComponent } from './Template_Component/Top_Navigation/topnavigation.component';
import { FooterComponent } from './Template_Component/Footer/footer.component';
import { LoginComponent } from './Template_Component/login/login.component';

//Dashboard COmponent
import { DashboardComponent } from './Dashboard/dashboard.component';
  //PPC Components
  import { ScheduleEditComponent } from './Dashboard/PPC/ScheduleEdit/scheduleedit.component';

 //Mater Component
 import { ItemComponent } from './Dashboard/Masters/ComponentMaster/item.component';
 import { LoadingData } from './Dashboard/Masters/PendingRound/loadingdata.component';
 import { FrmLoading } from './Dashboard/Masters/EditPendingRound/frmloading.component';
 import { CustomerItemMasterComponent } from './Dashboard/Masters/CustomerItemMaster/custitemmaster.component'
 import { CustomerMasterComponent } from './Dashboard/Masters/CustomerMaster/custmaster.component'

 //Jigg 
  import { JiggReport } from './Dashboard/JiggManufacture/JiggMfgReport/jiggreport.component';
  import { JigMasterComponent } from './Dashboard/JiggManufacture/JigMaster/jigmaster.component';
  import { JiggCount } from './Dashboard/JiggManufacture/JiggCount/jiggcount.component';
  import { JiggingReport } from './Dashboard/JiggManufacture/JiggingReport/jiggingreport.component';

@NgModule({
  declarations: [
    AppComponent,
    //Template Components
    TopNavigationComponent,
    FooterComponent,
    LoginComponent,

    //Dashboard Components
    DashboardComponent,
      //PPC Components
      ScheduleEditComponent,
      //Master Component
      ItemComponent,
      LoadingData,
      FrmLoading,
      CustomerItemMasterComponent,
      CustomerMasterComponent,

      //Jigg Component
      JiggReport,
      JigMasterComponent,
      JiggCount,
      JiggingReport
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    GenericTableModule,
    ColumnSettingsModule,
    BusyModule,
    Ng2PaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
