import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  decodedToken:any;
  jwtHelperService = new JwtHelperService();
  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this.decodedToken = this.jwtHelperService.decodeToken(localStorage.getItem('token'));
  }
  loggedIn() {
    return this._authService.loggedIn();
  }
}
