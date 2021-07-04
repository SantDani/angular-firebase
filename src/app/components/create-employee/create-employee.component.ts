import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ToastService} from "../../services/toast.service";




@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {

  createEmployee: FormGroup;
  submitted: boolean;
  loading: boolean;
  id: string | null;
  title = 'Add Employee';

  constructor(
    private fb: FormBuilder,
    private serviceEmployee:EmployeeService,
    private router: Router,
    private toast: ToastService,
    private aRoute: ActivatedRoute
  ) {
    this.createEmployee = this.fb.group(
      {
        name:['', Validators.required],
        last:['', Validators.required],
        document:['', Validators.required],
        salary:['', Validators.required],
      }
    )

    this.submitted = false;
    this.loading = false;
    this.id = aRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
  this.isEdit();

  }

  addEdit() {
    this.submitted = true;

    if(this.createEmployee.invalid){
      return;
    }


    if(this.id == null){
      this.addEmployee();
    }else{
      this.editEmployee();
    }


  }

  showSuccess(msg :string){
    this.toast.showSuccess(msg );
  }

  isEdit(){
    console.log(this.id);
    if(this.id !== null){
      this.title = 'Edit Employee';
      this.loading = true;

        this.getEmployee();
    }
  }

  getEmployee(){
    this.serviceEmployee.getEmployee(this.id).subscribe( data =>{

      this.loading = false;

      this.createEmployee.setValue({
        name: data.payload.data().name,
        last: data.payload.data().last,
        document: data.payload.data().document,
        salary: data.payload.data().salary,
      })
    });
  }

  addEmployee(){
    const employee: any = {
      name: this.createEmployee.value.name,
      last: this.createEmployee.value.last,
      document: this.createEmployee.value.document,
      salary: this.createEmployee.value.salary,
      creationDate: new Date(),
      updateDate: new Date(),


    };
    // console.log(this.createEmployee);
    this.loading = true;
    this.serviceEmployee.addEmployee(employee).then(() => {
      console.log('empleado registado ok');
      this.loading = false;
      this.showSuccess('Registered successfully')
      this.router.navigate(['/list-employee']);


    }).catch( error => {
      console.log(error);
      this.loading = false;
    })

    console.log(employee);
  }

  private editEmployee() {
    this.loading = true;

    const employee: any = {
      name: this.createEmployee.value.name,
      last: this.createEmployee.value.last,
      document: this.createEmployee.value.document,
      salary: this.createEmployee.value.salary,
      updateDate: new Date(),


    };
    this.serviceEmployee.updateEmployee(this.id, employee).then(() => {
      this.loading = false;
      this.toast.showSuccess('Edit successfully')

      this.router.navigate(['/list-employee']);
    })
  }
}
