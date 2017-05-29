import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
