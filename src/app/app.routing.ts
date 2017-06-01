import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

//Template COmponents
import { LoginComponent } from './Template_Component/login/login.component';

//Dashboard Components
import { DashboardComponent } from './Dashboard/dashboard.component'
    //PPC Components
    import { ScheduleEditComponent } from './Dashboard/PPC/ScheduleEdit/scheduleedit.component'
    //Master Components
     import { ItemComponent } from './Dashboard/Masters/ComponentMaster/item.component'
     import { LoadingData } from './Dashboard/Masters/PendingRound/loadingdata.component';
     import { FrmLoading } from './Dashboard/Masters/EditPendingRound/frmloading.component';
     
     //Jigg Manufacture
     import { JiggReport } from './Dashboard/JiggManufacture/JiggMfgReport/jiggreport.component';
     import { JigMasterComponent } from './Dashboard/JiggManufacture/JigMaster/jigmaster.component';

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
                path: 'JiggManufacture/JiggMfgReport',
                component: JiggReport
            },
            {
                path: 'JiggManufacture/JiggMaster',
                component: JigMasterComponent
            },
        ]
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute);