import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'department-detail',
  templateUrl: './departmentdetail.component.html',
  styleUrls: ['./departmentdetail.component.css']
})
export class DepartmentdetailComponent implements OnInit {

  @Input() department:any ={};
  @Output() newItemEvent:EventEmitter<any> = new EventEmitter<any>();
  succesed = false;
  constructor(private _alertify:AlertifyService,private _adminService:AdminService) { }

  ngOnInit() {
  }
  updateDep(){
    this._adminService.UpdateDepartment(this.department).subscribe(data=>{
      if(data){
        this.newItemEvent.emit(data);
        this.succesed = true;
        this._alertify.success("Güncelleme işlemi başarıyla gerçekleşti..")
        setTimeout(() => {
          this.succesed = false;
        },3000);
      }
    },err =>{
      this._alertify.error(err.error.message);
    })
  }
}
