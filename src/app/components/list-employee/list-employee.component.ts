import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  items: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit(): void {
  }

}
