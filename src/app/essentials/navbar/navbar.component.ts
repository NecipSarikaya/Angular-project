import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(
    private route:Router,
    private _authService: AuthService
  ) {
  }
  ngOnInit(): void {
    document.getElementById("button").click();
    this.decodedToken = this.jwtHelper.decodeToken(
      localStorage.getItem('token')
    );
  }

  loggedIn() {
    return this._authService.loggedIn();
  }
  logout() {
    this._authService.logout();
    this.route.navigate(['/']);
  }
  IsAdmin(){
    if(this.decodedToken == null){
      return this._authService.IsAdmin();
    }else{
      if(this.decodedToken.role == "admin")
        return true;
      else
        return false;
    }
  }

}
