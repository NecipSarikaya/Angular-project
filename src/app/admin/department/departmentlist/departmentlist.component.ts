import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "src/app/_services/admin.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { DepartmetService } from "src/app/_services/department.service";

@Component({
  selector: "app-departmentlist",
  templateUrl: "./departmentlist.component.html",
  styleUrls: ["./departmentlist.component.css"],
})
export class DepartmentlistComponent implements OnInit {
  data: any = [];
  dtOptions: DataTables.Settings = {};
  add = false;
  detail = false;
  detailedDep: any;
  constructor(
    private _alertify: AlertifyService,
    private route: ActivatedRoute,
    private _adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.data = data.departments;
      this.dtOptions = {
        pagingType: "full_numbers",
        pageLength: 5,
        lengthMenu: [5, 15, 25],
        processing: true,
      };
    });
  }
  deleteDep(depId, index) {
    if (depId == null || index == null) {
      this._alertify.message();
      return;
    }
    this._adminService.DeleteDepartment(depId).subscribe(
      (data) => {
        if (data.id == depId) {
          this.data.splice(index, 1);
        }
        this._alertify.success("Kaldırma işlemi başarıyla gerçekleşti..");
      },
      (err) => {
        this._alertify.error(err.error.message);
      }
    );
  }
  ShowAdd() {
    this.add = true;
    this.detail = false;
  }
  GetDetail(category) {
    if (category == null) {
      this._alertify.message();
      return;
    }
    this.detail = true;
    this.add = false;
    this.detailedDep = category;
  }
  addItem(newItem: string) {
    if (newItem == null) {
      this._alertify.message();
      return;
    }
    this.data.push(newItem);
    this.add = false;
  }
  getItem(newItem: any) {
    if (newItem == null) {
      this._alertify.message();
      return;
    }
    this.data.forEach((el) => {
      if (el.id == newItem.id) {
        el = newItem;
      }
    });
    setTimeout(() => {
      this.detail = false;
    }, 3000);
  }
}
