import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(msg :string){
    this.toastr.success(msg, 'Correct' );
  }

  delete(msg: string){
    this.toastr.error(msg, 'Deleted')
  }
}
