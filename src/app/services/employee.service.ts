import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  EMPLOYEE = 'employee';
  constructor(private firestore:AngularFirestore) { }

  addEmployee(employee: any):Promise<any>{
    return this.firestore.collection('employee').add(employee);
  }

  getEmployees():Observable<any>{
    /*
    * ..snapshotChanges return a Observable
    * Each time that collection was updated prints the new data in firestore*/
    return this.firestore.collection('employee', ref=> ref.orderBy('name', 'asc')).snapshotChanges();
  }

  deleteEmployee(id: string): Promise<any>{
    return this.firestore.collection(this.EMPLOYEE).doc(id).delete();
  }

  getEmployee(id:any): Observable<any>{
    return this.firestore.collection(this.EMPLOYEE).doc(id).snapshotChanges();
  }

  updateEmployee(id: any, data:any) {

    return this.firestore.collection(this.EMPLOYEE).doc(id).update(data);

  }
}
