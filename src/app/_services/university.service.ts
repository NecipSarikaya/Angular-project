import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UniversityService {

  baseUrl: string = "http://localhost:5000/api/university/";

  constructor(private http: HttpClient) {}

  GetUniByUniNameUrl(uniNameUrl:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+uniNameUrl);
  }
  GetAllUniversities():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }
}
