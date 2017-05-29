import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

//Template COmponents
import { LoginComponent } from './Template_Component/login/login.component';

//Dashboard Components
import { DashboardComponent } from './Dashboard/dashboard.component'
    //PPC Components
    import { ScheduleEditComponent } from './Dashboard/PPC/ScheduleEdit/scheduleedit.component'


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
            }
        ]
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute);