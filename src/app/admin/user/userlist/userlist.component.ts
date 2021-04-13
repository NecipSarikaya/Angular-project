import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  data:any =[];
  dtOptions :DataTables.Settings = {};
  constructor(private _alertify:AlertifyService,private _adminService:AdminService,private route:ActivatedRoute) { }

  ngOnInit() {
    this._adminService.GetAllUser().subscribe(data=>{
      this.data = data;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength:5,
        lengthMenu:[5,15,25],
        processing : true
      }
    })
  }
  BanUser(userId,index){
    if(userId == null || index == null){
        this._alertify.message()
        return;
    }
    var model = {
      isBanned:true
    }
    this._adminService.UpdateUser(model,userId).subscribe(data=>{
      this.data[index] = data;
      this._alertify.success("Banlama işlemi başarıyla gerçekleşti..")
    },err=>{
      this._alertify.error(err.error.message)
    }
    )
  }
  UnBanUser(userId,index){
    if(userId == null || index == null){
      this._alertify.message()
        return;
    }
    var model = {
      isBanned: false
    }
    this._adminService.UpdateUser(model,userId).subscribe(data=>{
      this.data[index] = data;
      this._alertify.success("Ban kaldırma işlemi başarıyla gerçekleşti..")
    },err=>{
      this._alertify.error(err.error.message)
    })
  }
}
