import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  model: any = {};
  errorMessage: any;
  resetModel: any = {};
  reset = false;
  resultMessage;
  constructor(
    private _alertify: AlertifyService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {}
  login() {
    this._authService.login(this.model).subscribe(
      (data) => {
        this.router.navigate(["/"]);
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }
  ResetPassword() {
    this.reset = true;
  }
  sendEmail() {
    this._authService.ResetPassword(this.resetModel).subscribe(
      (data) => {
        this.reset = false;
        this.resetModel = {};
        this._alertify.success(
          "Email adresinize gönderilen linke tıklayarak şifrenizi yenileyebilirsiniz."
        );
      },
      (err) => {
        this._alertify.error(err.error.message);
        this.resetModel = {};
      }
    );
  }
}
