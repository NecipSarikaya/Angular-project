import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'department-create',
  templateUrl: './departmentcreate.component.html',
  styleUrls: ['./departmentcreate.component.css']
})
export class DepartmentcreateComponent implements OnInit {

  @Output() newItemEvent:EventEmitter<any> = new EventEmitter<any>();
  department:any ={};
  succesed = false;
  constructor(private _alertify:AlertifyService,private _adminService:AdminService) { }

  ngOnInit() {
  }
  createDep(){
    this._adminService.CreateDepartment(this.department).subscribe(data=>{
      if(data){
        this.newItemEvent.emit(data);
        this.succesed = true;
        this._alertify.success("Bölüm oluşturma işlemi başarıyla gerçekleşti..")
        setTimeout(()=>{
          this.succesed = false;
        },2000)
      }
    },err =>{
      this._alertify.error(err.error.message);
    })
  }
}
