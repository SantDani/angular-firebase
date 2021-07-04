import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {EmployeeService} from "../../services/employee.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: any;
  constructor(
    private firestore: AngularFirestore,
    private serviceEmployee: EmployeeService,
    private toast: ToastService
    ) {
    this.employees = [];
    this.getEmployees();
  }

  ngOnInit(): void {

  }

  getEmployees(){
    this.serviceEmployee.getEmployees().subscribe( data => {
      console.log('lanzo el conseguir empleados');
      console.log(data);
      this.employees = [];
      data.forEach(( employee: any) => {
        // console.log(employee.payload.doc.id);
        console.log(employee.payload.doc.data());
        this.employees.push({
          id: employee.payload.doc.id,
          ...employee.payload.doc.data()

        });
      });
    });
  }

  deleteEmployee(id: string){
    this.serviceEmployee.deleteEmployee(id).then(() => {

      this.toast.delete('Deleted correctly')
    }).catch(error => {
      console.log(error);
    });
  }

}
