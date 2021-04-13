import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-admincatpostlist',
  templateUrl: './admincatpostlist.component.html',
  styleUrls: ['./admincatpostlist.component.css']
})
export class AdmincatpostlistComponent implements OnInit {

  data:any =[];
  dtOptions :DataTables.Settings = {};
  constructor(
    private _alertify:AlertifyService,
    private route:ActivatedRoute,
    private _adminService:AdminService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.data = data.catposts;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength:5,
        lengthMenu:[5,15,25],
        processing : true,
        order:[0,"desc"]
      }
    })
  }
  MakeInvisible(post){
    if(post == null){
      this._alertify.message();
      return;
    }
    var model = {
      isVisible : !post.isVisible,
      isReported : post.isReported,
    }
    this._adminService.UpdateCatPost(model,post.id).subscribe(data =>{
      post.isVisible = data.isVisible
    })
  }
  ManageReport(post){
    if(post == null){
      this._alertify.message();
      return;
    }
    var model = {
      isReported : !post.isReported,
      isVisible : post.isVisible
    }
    this._adminService.UpdateCatPost(model,post.id).subscribe(data =>{
      post.isReported = data.isReported
      this._alertify.success("Raporlama başarıyla kaldırıldı");
    },err =>{
      this._alertify.error(err.error.message)
    })
  }
}
