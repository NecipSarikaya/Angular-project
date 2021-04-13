import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn:"root"
})
export class AuthGuard implements CanActivate
{
  constructor(private router:Router,private _authService:AuthService) {}
  canActivate(){
    if(this._authService.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/']);
    }
  }
}
