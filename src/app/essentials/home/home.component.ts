import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HomeService } from 'src/app/_services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _homeService:HomeService,private route:ActivatedRoute) { }

  universities:any =[];
  categories:any =[];
  decodedToken:any;
  jwtHelper  = new JwtHelperService();
  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.route.data.subscribe(data=>{
      this.universities = data.universities;
      this.categories = data.categories.splice(0,4);
    })
  }
}
