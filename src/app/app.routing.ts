import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

//Template COmponents
import { LoginComponent } from './Template_Component/login/login.component';

//Dashboard Components
import { DashboardComponent } from './Dashboard/dashboard.component'
    //PPC Components
    import { ScheduleEditComponent } from './Dashboard/PPC/ScheduleEdit/scheduleedit.component';
    import { PPCSummaryComponent } from './Dashboard/PPC/PPCSummary/ppcsummary.component';
    import { PPCDailyReportComponent } from './Dashboard/PPC/PPCDailyReport/ppcdailyreport.component';

    //Master Components
     import { ItemComponent } from './Dashboard/Masters/ComponentMaster/item.component';
     import { LoadingData } from './Dashboard/Masters/PendingRound/loadingdata.component';
     import { FrmLoading } from './Dashboard/Masters/EditPendingRound/frmloading.component';
     import { CustomerItemMasterComponent } from './Dashboard/Masters/CustomerItemMaster/custitemmaster.component'
     import { CustomerMasterComponent } from './Dashboard/Masters/CustomerMaster/custmaster.component'
     
     //Jigg Manufacture
     import { JiggReport } from './Dashboard/JiggManufacture/JiggMfgReport/jiggreport.component';
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
     import { ChromeRejectionReviewComponent } from './Dashboard/Chrome/ChromeRejectionReview/chromerejectionreview.component'

const appRoute: Routes = [
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'Dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: StatisticsDashboardComponent
            },
            {
                path: 'PPC/ScheduleEdit',
                component: ScheduleEditComponent
            },
            {
                path: 'PPC/PPCSummary',
                component: PPCSummaryComponent
            },
            {
                path: 'PPC/PPCDailyReport',
                component: PPCDailyReportComponent
            },
            {
                path: 'Masters/ComponentMaster',
                component: ItemComponent
            },
            {
                path: 'Masters/PendingRound',
                component: LoadingData
            },
            {
                path: 'Masters/EditPendingRound',
                component: FrmLoading
            },
            {
                path: 'Masters/CustomerItem',
                component: CustomerItemMasterComponent
            },
            {
                path: 'Masters/CustomerMaster',
                component: CustomerMasterComponent
            },
             {
                path: 'JiggManufacture/JiggMfgReport',
                component: JiggReport
            },
             {
                path: 'JiggManufacture/JiggMaster',
                component: JigMasterComponent
            },
            {
                path: 'JiggManufacture/JiggCount',
                component: JiggCount
            },
            {
                path: 'JiggManufacture/JiggingReport',
                component: JiggingReportComponent
            },
             {
                path: 'JiggManufacture/JiggEntry',
                component: JiggEntry
            },
            {
                path: 'DashboardPrimary',
                component: CSDashboardComponent
            },
            {
                path: 'JiggDashboard',
                component: JiggDashboardComponent
            },
            {
                path: 'PPCDashboard',
                component: PPCDashboardComponent
            },
            {
                path: 'Chrome/Daily',
                component: DailyChromeSatinComponent
            },
            {
                path: 'Satin/Daily',
                component: DailyChromeSatinComponent
            },
            {
                path: 'Chrome/Weekly',
                component: WeeklyChromeSatinComponent
            },
            {
                path: 'Satin/Weekly',
                component: WeeklyChromeSatinComponent
            },
            {
                path: 'Chrome/Monthly',
                component: MonthlyChromeSatinComponent
            },
            {
                path: 'Satin/Monthly',
                component: MonthlyChromeSatinComponent
            },
            {
                path: 'Chrome/Yearly',
                component: yearlyChromeSatinComponent
            },
            {
                path: 'Satin/Yearly',
                component: yearlyChromeSatinComponent
            },
            {
                path: 'Chrome/ChromeRejectionReview',
                component: ChromeRejectionReviewComponent
            }
        ]
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute);