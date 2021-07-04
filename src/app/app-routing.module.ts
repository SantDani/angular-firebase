import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListEmployeeComponent} from "./components/list-employee/list-employee.component";
import {CreateEmployeeComponent} from "./components/create-employee/create-employee.component";

const routes: Routes = [
  {path: '', redirectTo: 'list-employee', pathMatch: 'full'},
  {path: 'list-employee', component: ListEmployeeComponent},
  {path: 'create-employee', component: CreateEmployeeComponent},
  {path: 'edit-employee/:id', component: CreateEmployeeComponent},
  {path: '**', redirectTo: 'list-employee', pathMatch: 'full'},

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
