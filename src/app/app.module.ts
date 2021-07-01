import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imports
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from "@angular/fire";
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { AppComponent } from './app.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Environment
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
