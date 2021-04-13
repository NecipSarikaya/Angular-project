import { Component, Input, OnInit } from "@angular/core";
import { AlertifyService } from "src/app/_services/alertify.service";
import { HomeService } from "src/app/_services/home.service";

@Component({
  selector: "contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  model: any = {};
  constructor(private _alertify:AlertifyService,private _homeService: HomeService) {}

  ngOnInit(): void {}
  SubmitForm() {
    if(this.model == null){
      this._alertify.message()
      return;
    }
    this._homeService.SendEmail(this.model).subscribe(
      () => {
          this._alertify.success("Mail başarıyla gönderildi");
          this.model = {
          name: " ",
          title: " ",
          content: " ",
        };
      },
      (err) => {
        if(err.status == 200){
          this._alertify.success("Mail başarıyla gönderildi");
        }else{
          this._alertify.error("Mail gönderirken bir hata oluştu");
        }
        this.model = {
          name: " ",
          title: " ",
          content: " ",
        };
      }
    );
  }
}
