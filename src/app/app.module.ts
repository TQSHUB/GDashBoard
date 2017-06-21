import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { Ng2PaginationModule } from 'ng2-pagination';

//Pipes
import { JsonDate } from './Pipes/jsondate.pipe';

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
  import { PPCSummaryComponent } from './Dashboard/PPC/PPCSummary/ppcsummary.component';
  import { PPCDailyReportComponent } from './Dashboard/PPC/PPCDailyReport/ppcdailyreport.component';

 //Mater Component
 import { ItemComponent } from './Dashboard/Masters/ComponentMaster/item.component';
 import { LoadingData } from './Dashboard/Masters/PendingRound/loadingdata.component';
 import { FrmLoading } from './Dashboard/Masters/EditPendingRound/frmloading.component';
 import { CustomerItemMasterComponent } from './Dashboard/Masters/CustomerItemMaster/custitemmaster.component'
 import { CustomerMasterComponent } from './Dashboard/Masters/CustomerMaster/custmaster.component'

 //Jigg 
  import { JiggReportComponent } from './Dashboard/JiggManufacture/JiggMfgReport/jiggreport.component';
  import { JigMasterComponent } from './Dashboard/JiggManufacture/JigMaster/jigmaster.component';
  import { JiggCount } from './Dashboard/JiggManufacture/JiggCount/jiggcount.component';
  import { JiggingReportComponent } from './Dashboard/JiggManufacture/JiggingReport/jiggingreport.component';
  import {JiggEntry} from './Dashboard/JiggManufacture/JiggMfgEntry/jiggentry.component';

  //Dashboard
  import { CSDashboardComponent } from './Dashboard/Dashboard/CSDashboard/csdashboard.component';
  import { JiggDashboardComponent } from './Dashboard/Dashboard/JiggDashboard/jiggdashboard.component';
  import { PPCDashboardComponent } from './Dashboard/Dashboard/PPCDashboard/ppcdashboard.component';

  //DWMY
     import { DailyChromeSatinComponent } from './Dashboard/DWMY/DailyChromeSatin/dailychromesatin.component';
     import { WeeklyChromeSatinComponent } from './Dashboard/DWMY/WeeklyChromeSatin/weeklychromesatin.component';
     import { MonthlyChromeSatinComponent } from './Dashboard/DWMY/MonthlyChromeSatin/monthlychromesatin.component';
     import { yearlyChromeSatinComponent } from './Dashboard/DWMY/YearlyChromeSatin/yearlychromesatin.component';

  //Statistics Dashboard
     import { StatisticsDashboardComponent } from './Dashboard/StatisticsDashboard/statisticsdashboard.component';

//Chrome
  import {ChromeDetailComponet} from './Dashboard/Chrome/InspReportQtyWise/chromedetail.componet';
  import {ChromeLineSummary} from './Dashboard/Chrome/InspReportValueWise/chromelinesummary.component';
  import { ChromeRejectionReviewComponent } from './Dashboard/Chrome/ChromeRejectionReview/chromerejectionreview.component';
  import {ChromeRejectionQtyComponet} from './Dashboard/Chrome/ChromeRejectionQtyWise/chromerejectiondetail.component';
  import {ChromeRejectionValueComponet} from './Dashboard/Chrome/ChromeRejectionValueWise/chromelinerejection.component';

 //Satin
  import {SatinDetailComponet} from './Dashboard/Satin/InspReportQtyWise/satindetail.component'; 
  import {SatinLineSummary} from './Dashboard/Satin/InspReportValueWise/satinlinesummary.componet';
  import {SatinRejectionQtyComponet} from './Dashboard/Satin/SatinRejectionQtyWise/satinrejectiondetail.component';

@NgModule({
  declarations: [
    AppComponent,
    //Pipes
    JsonDate,
    
    //Template Components
    TopNavigationComponent,
    FooterComponent,
    LoginComponent,

    //Dashboard Components
    DashboardComponent,
      //Statistics Dashboard
      StatisticsDashboardComponent,
      //PPC Components
      ScheduleEditComponent,
      PPCSummaryComponent,
      PPCDailyReportComponent,

      //Master Component
      ItemComponent,
      LoadingData,
      FrmLoading,
      CustomerItemMasterComponent,
      CustomerMasterComponent,

      //Jigg Component
      JiggReportComponent,
      JigMasterComponent,
      JiggCount,
      JiggingReportComponent,
      JiggEntry,

      //Dashboard
      CSDashboardComponent,
      JiggDashboardComponent,
      PPCDashboardComponent,

      //DWMY
      DailyChromeSatinComponent,
      WeeklyChromeSatinComponent,
      MonthlyChromeSatinComponent,
      yearlyChromeSatinComponent,

      //Chrome
      ChromeDetailComponet,
      ChromeLineSummary,
      ChromeRejectionReviewComponent,
      ChromeRejectionQtyComponet,
      ChromeRejectionValueComponet,
      
      //Satin
      SatinDetailComponet,
      SatinLineSummary,
      SatinRejectionQtyComponet
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
