import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "src/app/_services/admin.service";
import { AlertifyService } from "src/app/_services/alertify.service";

@Component({
  selector: "app-adminunicommentlist",
  templateUrl: "./adminunicommentlist.component.html",
  styleUrls: ["./adminunicommentlist.component.css"],
})
export class AdminunicommentlistComponent implements OnInit {
  data: any = [];
  dtOptions: DataTables.Settings = {};
  constructor(
    private _alertify:AlertifyService,
    private route: ActivatedRoute,
    private _adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.data = data.catcomments;
      this.dtOptions = {
        pagingType: "full_numbers",
        pageLength: 5,
        lengthMenu: [5, 15, 25],
        processing: true,
        order:[0,"desc"]
      };
    });
  }
  MakeInvisible(comment) {
    if(comment == null){
      this._alertify.message();
      return;
    }
    var model = {
      isVisible: !comment.isVisible,
      isReported: comment.isReported,
    };
    this._adminService.UpdateUniComment(model, comment.id).subscribe(
      (data) => {
        comment.isVisible = data.isVisible;
        this._alertify.success("Yorum görünürlüğü başarıyla  değişirildi")
      },
      (err) => {
        this._alertify.error(err.error.message);
      }
    );
  }
  ManageReport(comment) {
    if(comment == null){
      this._alertify.message();
      return;
    }
    var model = {
      isVisible: comment.isVisible,
      isReported: !comment.isReported,
    };
    this._adminService.UpdateUniComment(model, comment.id).subscribe((data) => {
      comment.isReported = data.isReported;
      this._alertify.success("Rapor başarıyla değerlendirildi")
    },err=>{
      this._alertify.error(err.error.message);
    });
  }
}
