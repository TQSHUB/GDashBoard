import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

//Template COmponents
import { LoginComponent } from './Template_Component/login/login.component';

//Dashboard Components
import { DashboardComponent } from './Dashboard/dashboard.component'
    //PPC Components
    import { ScheduleEditComponent } from './Dashboard/PPC/ScheduleEdit/scheduleedit.component';
    import { PPCSummaryComponent } from './Dashboard/PPC/PPCSummary/ppcsummary.component';
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
     import { JiggingReport } from './Dashboard/JiggManufacture/JiggingReport/jiggingreport.component';

     //Dashboard
     import { CSDashboardComponent } from './Dashboard/Dashboard/CSDashboard/csdashboard.component';

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
                path: 'PPC/ScheduleEdit',
                component: ScheduleEditComponent
            },
            {
                path: 'PPC/PPCSummary',
                component: PPCSummaryComponent
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
                component: JiggingReport
            }
            ,
            {
                path: 'Dashboard/DashboardPrimary',
                component: CSDashboardComponent
            }
        ]
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute);