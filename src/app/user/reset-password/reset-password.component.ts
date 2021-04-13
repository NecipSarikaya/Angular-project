import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  model:any = {};
  user:any = {};
  errorMessage;
  constructor(private _alertify:AlertifyService,private router:Router,private route:ActivatedRoute,private _authService:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data.user;
    })
    this.route.queryParams.subscribe(data=>{
      this.model.token = decodeURIComponent(data.token);
    })
  }
  resetPassword(){
    if(this.model.email != this.user.email){
      this.errorMessage = "Email adresleri uyuşmuyor .Lütfen doğru mail adresini giriniz"
    }else{
      this._authService.FullReset(this.model).subscribe(data=>{
        this.router.navigate(['/giris-yap']);
      },err=>{
        this._alertify.error(err.error.message);
      })
    }
  }
}
