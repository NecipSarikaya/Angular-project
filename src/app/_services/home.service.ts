import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HomeService {

  baseUrl: string = "http://localhost:5000/api/home/";
  constructor(private http: HttpClient) {}

  SendEmail(model:any): Observable<any>{
    return this.http.post<any>(this.baseUrl+'contact',model);
  }
}
