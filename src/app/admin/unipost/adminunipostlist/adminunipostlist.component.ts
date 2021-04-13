import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "src/app/_services/admin.service";
import { AlertifyService } from "src/app/_services/alertify.service";

@Component({
  selector: "app-adminunipostlist",
  templateUrl: "./adminunipostlist.component.html",
  styleUrls: ["./adminunipostlist.component.css"],
})
export class AdminunipostlistComponent implements OnInit {
  data: any = [];
  dtOptions: DataTables.Settings = {};
  constructor(
    private _alertify:AlertifyService,
    private _adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.data = data.uniposts;
      this.dtOptions = {
        pagingType: "full_numbers",
        pageLength: 5,
        lengthMenu: [5, 15, 25],
        processing: true,
        order:[0,"desc"]
      };
    });
  }
  MakeInvisible(post) {
    if(post == null){
      this._alertify.message();
      return;
    }
    var model = {
      isVisible: !post.isVisible,
      isReported: post.isReported,
      isPopular: post.isPopular,
    };
    this._adminService.UpdateUniPost(model, post.id).subscribe((data) => {
      post.isVisible = data.isVisible;
      this._alertify.success("Post başarıyla görünürlüğü değişirildi")
    },err =>{
      this._alertify.error(err.error.message);
    });
  }
  MakePopular(post) {
    if(post == null){
      this._alertify.message();
      return;
    }
    var model = {
      isVisible: post.isVisible,
      isReported: post.isReported,
      isPopular: !post.isPopular,
    };
    this._adminService.UpdateUniPost(model, post.id).subscribe((data) => {
      post.isPopular = data.isPopular;
      this._alertify.success("Post başarıyla popüler yapıldı")
      },err=>{
      this._alertify.error(err.error.message);
    });
  }
  ManageReport(post) {
    if(post == null){
      this._alertify.message();
      return;
    }
    var model = {
      isVisible: post.isVisible,
      isPopular: post.isPopular,
      isReported: !post.isReported,
    };
    this._adminService.UpdateUniPost(model, post.id).subscribe(
      (data) => {
        post.isReported = data.isReported;
        this._alertify.success("Rapor başarıyla değerlendirildi")
      },
      (err) => {
        this._alertify.error(err.error.message);
      }
    );
  }
}
