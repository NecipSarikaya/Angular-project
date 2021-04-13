import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn:"root"
})
export class AdminAuthGuard implements CanActivate
{
  decodedToken:any;
  jwtHelper = new JwtHelperService();
  constructor(private router:Router,private _authService:AuthService) {}

  canActivate(){
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    if(this.decodedToken.role == "admin")
    {
      return true;
    }else{
      this.router.navigate(['/']);
    }
  }
}
