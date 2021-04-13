import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "src/app/_services/admin.service";
import { AlertifyService } from "src/app/_services/alertify.service";

@Component({
  selector: "app-admincatcommentlist",
  templateUrl: "./admincatcommentlist.component.html",
  styleUrls: ["./admincatcommentlist.component.css"],
})
export class AdmincatcommentlistComponent implements OnInit {
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
        order: [0, "desc"],
      };
    });
  }
  MakeInvisible(comment) {
    if(comment == null){
      this._alertify.message();
      return;
    }
    var model = {
      isReported: comment.isReported,
      isVisible: !comment.isVisible,
    };
    this._adminService.UpdateCatComment(model, comment.id).subscribe((data) => {
      comment.isVisible = data.isVisible;
      this._alertify.success("Görünürlük değiştirildi");
    },err =>{
      this._alertify.error(err.error.message)
    });
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
    this._adminService.UpdateCatComment(model, comment.id).subscribe((data) => {
      comment.isReported = data.isReported;
      this._alertify.success("Rapor Başarıyla denetlendi");
    },err =>{
      this._alertify.error(err.error.message)
    });
  }
}
