import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { AlertifyService } from "src/app/_services/alertify.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public loading = false;
  model: any = {
    gender: "",
    universityId: 0,
    departmentId: 0,
  };
  isRegistered = false;
  InitialData: any = {};
  ImageToUpload: File;
  ImageUrl;
  repassword: any = {};
  controlPass;
  errorMessage: any = "";
  selectedItems = [];
  selectedItemsDep = [];
  dropdownSettings: IDropdownSettings;
  dropdownSettings1: IDropdownSettings;
  constructor(
    private _alertify:AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.InitialData = data.data;
      this.InitialData.departments.splice(data.data.departments.length-1, 1);
    });
    this.selectedItems = [];
    this.selectedItemsDep = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: "id",
      textField: "name",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: "id",
      textField: "name",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  register() {
    this.loading = true;
    if (this.ImageToUpload == null) {
      this.model.imageUrl = "profil.png";
      this._authService.register(this.model).subscribe(
        (data: any) => {
          this.isRegistered = true;
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['giris-yap']);
          },4000);
        },
        (err) => {
          this.errorMessage = "";
          if (err.error.length > 1) {
            err.error.forEach((el) => {
              this.errorMessage += el.description + "\n";
            });
          } else {
            this.errorMessage = err.error[0].description;
          }
          this.loading = false;
        }
      );
    } else {
      this._authService.register(this.model).subscribe(
        (data: any) => {
          this._authService.uploadImage(this.ImageToUpload, data.id).subscribe(
            () => {
              this.isRegistered = true;
              this.loading = false;
              setTimeout(() => {
                this.router.navigate(['giris-yap']);
              },2500);
            },
            (err) => {
              this.errorMessage = "";
              this.errorMessage = err.error.Message;
              this._alertify.error(err.error.message)
              this.loading = false;
          }
          );
        },
        (err) => {
          this.errorMessage = "";
          if (err.error.length > 1) {
            err.error.forEach((el) => {
              this.errorMessage += el.description + "\n";
            });
          } else {
            this.errorMessage = err.error[0].description;
          }
          this.loading = false;
        }
      );
    }
  }
  selectImage(event: FileList) {
    if(event == null){
      this._alertify.message();
      return;
    }
    if(event.item(0).size > 350000){
      this._alertify.warning("Tanımlanan resmin boyutu çok yüksek..")
      this.ImageToUpload = null;
      this.ImageUrl = null;
      return;
    }
    if (event.length > 0) {
      this.ImageToUpload = event.item(0);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.ImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.ImageToUpload);
    }
  }
  onItemSelect(item: any) {
    this.model.universityId = item.id;
  }
  onItemSelectDep(item: any) {
    this.model.departmentId = item.id;
  }
}
