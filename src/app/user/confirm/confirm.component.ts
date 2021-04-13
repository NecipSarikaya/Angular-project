import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  model:any ={};
  constructor(private _alertify:AlertifyService,private _authService:AuthService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data=>{
      this.model.token = data.token;
      this.model.id = data.userId;
    })
    this._authService.ConfirmEmail(this.model).subscribe(data=>{
      this._alertify.success("Mailiniz başarıyla onaylandı lütfen giriş yapınız");
    },err=>{
      this._alertify.error(err.error.message);

    })
  }

}
