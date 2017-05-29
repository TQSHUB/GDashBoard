import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

//Template Components
import { TopNavigation } from './Template_Component/Top_Navigation/topnavigation.component';

@NgModule({
  declarations: [
    AppComponent,
    //Template Components
    TopNavigation
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
