import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  baseUrl: string = "http://localhost:5000/api/auth/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  getRegisterData(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "register", model);
  }
  uploadImage(file: any, userId) {
    var formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(
      this.baseUrl+"file/" + userId,
      formData
    );
  }

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((response: any) => {
        const result = response;
        if (response) {
          localStorage.setItem("token", result.token);
          this.decodedToken = this.jwtHelper.decodeToken(result.token);
        }
      })
    );
  }
  logout() {
    localStorage.removeItem("token");
  }
  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
  isOkey(){
    const token = localStorage.getItem('token');
    return token?true:false;
  }
  IsAdmin(){
    if(this.decodedToken.role == "admin")
        return true;
      else
        return false;
  }
  ResetPassword(model:any): Observable<any> {
    return this.http.post<any>(this.baseUrl+"reset",model);
  }
  FullReset(model:any): Observable<any> {
    return this.http.post<any>(this.baseUrl+"fullreset",model);
  }
  ConfirmEmail(model:any): Observable<any> {
    return this.http.put<any>(this.baseUrl+"confirm",model);
  }
}
